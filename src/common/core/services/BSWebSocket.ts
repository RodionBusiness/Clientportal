import { EventEmitter } from 'events';

type TSocketStatus = 'connected' | 'offline' | 'disconnected';
type TMessageId = string;
export interface IWSMessage {
  request_id: TMessageId;
  result: any;
  error: string;
  signal: string;
}
type TSocketCallback = {
  resolve: Function;
  reject: Function;
};

export enum SERVICE_SIGNALS {
  SESSION_ERROR = '_session_error_',
  SESSION_EXPIRED = '_session_expired_',
}

export class BSWebSocketService extends EventEmitter {
  private msgId = 1;
  private socket!: WebSocket; // Unsafe
  private status: TSocketStatus = 'offline';
  private callbacks: { [msgId: string]: TSocketCallback } = {};
  private signalCallbacks: { [code: string]: Function[] } = {};

  /**
   * Public API
   */

  public async init(url: string): Promise<BSWebSocketService> {
    this.connect(url);

    return new Promise<BSWebSocketService>((resolve, reject) => {
      const onOpen = () => {
        cleanUp();
        resolve(this);
      };

      const onError = (err: any) => {
        cleanUp();
        reject(err);
      };

      const cleanUp = () => {
        this.socket.removeEventListener('open', onOpen);
        this.socket.removeEventListener('error', onError);
      };

      this.socket.addEventListener('open', onOpen);
      this.socket.addEventListener('error', onError);
    });
  }

  public buildUrl(url: string, port: string = ''): string {
    const host = (port === '') ? location.host : location.host.split(':')[0];
    return `${location.protocol === 'https:' ? 'wss:' : 'ws:'}//${host}${port}${url}`;
  }

  public async invoke<T, P = any>(service: string, method: string, kwargs?: P): Promise<T> {
    // tslint:disable-next-line promise-must-complete
    return new Promise<T>(async (resolve, reject) => {
      const msgId = this.getNextMessageId();

      await this.ensureConnected();

      this.socket.send(JSON.stringify({
        service,
        method,
        kwargs: (kwargs === undefined) ? {} : kwargs,
        request_id: msgId,
      }));

      this.callbacks[msgId] = { resolve, reject };
    });
  }

  public subscribeSignal(code: string, callback: Function) {
    if (this.signalCallbacks[code] && this.signalCallbacks[code].indexOf(callback) !== -1) {
      return;
    }

    if (!this.signalCallbacks[code]) {
      this.signalCallbacks[code] = [];
    }

    this.signalCallbacks[code].push(callback);
  }

  public subscribeSignals(codes: string[], callback: Function) {
    codes.forEach((signal) => {
      this.subscribeSignal(signal, callback);
    });
  }

  public unsubscribeSignal(code: string, callback: Function) {
    if (!this.signalCallbacks[code] || this.signalCallbacks[code].indexOf(callback) === -1) {
      return;
    }

    const index = this.signalCallbacks[code].indexOf(callback);
    this.signalCallbacks[code].splice(index, 1);
  }

  public unsubscribeSignals(codes: string[], callback: Function) {
    codes.forEach((signal) => {
      this.unsubscribeSignal(signal, callback);
    });
  }

  public get connected() {
    return this.status === 'connected';
  }

  /**
   * Private methods
   */

  private ensureConnected(): Promise<void> {
    return this.connected ?
      Promise.resolve() :
      Promise.reject(new Error('BSWebSocketService did not connected yet'));
  }

  private getNextMessageId(): TMessageId {
    const msgId = this.msgId;
    this.msgId += 1;

    return msgId.toString();
  }

  private connect(url: string) {
    console.info(`BSWebSocketService connecting to ${url}`);

    this.socket = new WebSocket(url);

    this.socket.onopen = this.onConnect.bind(this);
    this.socket.onerror = console.error.bind(console, 'BSWebSocketService socket error:');
    this.socket.onclose = this.onDisconnect.bind(this);
    this.socket.onmessage = this.onMessage.bind(this);
  }

  private reconnect() {
    const url = this.socket.url;
    console.info(`BSWebSocketService [RE]connecting to ${url}`);

    this.socket.close();

    delete this.socket.onopen;
    delete this.socket.onerror;
    delete this.socket.onclose;
    delete this.socket.onmessage;

    setTimeout(() => this.connect(url), 1000);
  }

  private onMessage({ data }: { data: string }) {
    const message: IWSMessage = this.parseMessage(data);

    const { request_id: msgId, error, result, signal } = message;

    // Process errors
    if (signal) {
      this.handleSignal(signal, message, error);

      return;
    }

    this.handleMessage(msgId, result, error);
  }

  private handleSignal(signal: string, message: Object, error: string) {
    if (signal === SERVICE_SIGNALS.SESSION_ERROR || signal === SERVICE_SIGNALS.SESSION_EXPIRED) {
      this.emit(SERVICE_SIGNALS.SESSION_ERROR, message);
      this.rejectAllCallbacks(error);
    }

    if (!this.signalCallbacks[signal]) {
      return;
    }

    this.signalCallbacks[signal].forEach((callback) => {
      callback(message);
    });
  }

  private handleMessage(msgId: string, result: Object, error: string) {
    const promise = this.callbacks[msgId];

    if (!promise) {
      return;
    }

    delete this.callbacks[msgId];

    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(result);
    }
  }

  private rejectAllCallbacks(error: string) {
    Object.keys(this.callbacks).forEach((msgIdKey) => {
      this.callbacks[msgIdKey].reject(error);
    });
  }

  private parseMessage(data: string): IWSMessage {
    let message: any;

    try {
      message = JSON.parse(data);
    } catch (e) {
      console.error('error on socket message parsing:', e);
    }

    return message;
  }

  private onConnect() {
    this.status = 'connected';
    console.info(`BSWebSocketService connected to ${this.socket.url}`);
  }

  private onDisconnect() {
    this.status = 'disconnected';
    console.info('BSWebSocketService disconnected');
    setTimeout(() => this.reconnect());
  }
}

export const BSWebSocket = new BSWebSocketService();

import { timeout } from '@common/helpers/timeout';

export interface IRetryResult<T = any> {
  status: 'finished' | 'canceled',
  data: T | null
}

class Retry {
  static DEFAULT_TIMEOUT: number = 1000 * 60 * 2;
  static DEFAULT_DELAY: number = 1000;

  private tryFunction?: (timeout: boolean) => Promise<boolean>;
  private triesDelay: number = Retry.DEFAULT_DELAY;
  private timeout: number = Retry.DEFAULT_TIMEOUT;
  private canceled: boolean = false;

  private startedAt: number = 0;

  constructor() {}

  public async start(
    tryFunction: (timeout: boolean) => Promise<boolean>,
    triesDelay: number = Retry.DEFAULT_DELAY,
    timeout:number = Retry.DEFAULT_TIMEOUT
  ): Promise<IRetryResult> {
    this.triesDelay = triesDelay;
    this.tryFunction = tryFunction;
    this.timeout = timeout;
    this.canceled = false;

    this.startedAt = new Date().getTime();

    return await this.nextTry();
  }

  private async nextTry(): Promise<IRetryResult> {
    if (!this.tryFunction) {
      throw new Error('tryFunction was not specified');
    }

    if(this.canceled){
      return {
        status: 'canceled',
        data: null
      };
    }

    const fromStart = (new Date().getTime()) - this.startedAt;

    const data = await this.tryFunction(fromStart > this.timeout);

    if (data == null) {
      await timeout(this.triesDelay);
      return await this.nextTry();
    }

    return {
      status: 'finished',
      data
    }
  }

  public cancel(){
    this.canceled = true;
  }
}

export const RetryService = new Retry();

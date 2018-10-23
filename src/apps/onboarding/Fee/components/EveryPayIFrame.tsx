import * as React from 'react';

interface IEveryPayIFrame {
  id: string;
  origin: string;
  onMessage(data: IEveryPayMessage): void;
}

export interface IEveryPayMessage {
  resize_iframe: 'expand' | 'shrink';
  transaction_result: string;
  message_title: string;
  message_error?: string;
  message_action?: string;
  message_contact?: string;
}

export class EveryPayIFrame extends React.Component<IEveryPayIFrame> {

  public shouldComponentUpdate() {
    // Ensure that iframe will never be reloaded
    return false;
  }

  public componentDidMount() {
    this.lisetenIFrameMessages();
  }

  public componentWillUnmount() {
    this.unlistenIFrameMessages();
  }

  public render() {
    const { id } = this.props;

    return (
      // tslint:disable react-iframe-missing-sandbox
      <iframe
        className='every-pay__iframe'
        frameBorder={0}
        id={id}
        name={id}
        width='400'
        height='400'
      />
    );
  }

  private lisetenIFrameMessages() {
    window.addEventListener('message', this.onMessage);
  }

  private unlistenIFrameMessages() {
    window.removeEventListener('message', this.onMessage);
  }

  private onMessage = (evt: MessageEvent) => {
    const { origin, onMessage } = this.props;

    if (evt.origin !== origin) {
      // Message from other widget/extension or fraud attempt.
      return;
    }

    try {
      const data = evt.data;
      const messageData: IEveryPayMessage = JSON.parse(data);
      onMessage(messageData);
    } catch (err) {
      console.error('Error on parse message:', err);
    }
  }
}

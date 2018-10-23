import * as React from 'react';

import { hmacFieldsHash } from '@onboarding/Fee/helpers';

interface IEveryPayFormProps {
  iframeId: string;
  email: string;
  origin: string;
  amount: number;
  apiUsername: string;
  apiSecretKey: string;
  accountID: string;
  nonce: string;
  orderReference: string;
  skinName: string;
  callbackURL: string;
  customerURL: string;
}

export class EveryPayForm extends React.Component<IEveryPayFormProps> {
  private formSubmitted = false;

  public render() {
    const {
      accountID,
      amount,
      apiUsername,
      apiSecretKey,
      callbackURL,
      customerURL,
      email,
      iframeId,
      nonce,
      orderReference,
      origin,
      skinName,
    } = this.props;

    const inputs: {[key: string]: string | number} = {
      amount,
      nonce,
      email,
      account_id: accountID,
      api_username: apiUsername,
      callback_url: callbackURL,
      customer_url: customerURL,
      locale: 'en',
      order_reference: orderReference,
      skin_name: skinName,
      timestamp: Date.now(),
      transaction_type: 'charge',
    };

    const { hash, fields } = hmacFieldsHash(inputs, apiSecretKey);

    return (
      <form
        ref={this.submitFormRef}
        action={`${origin}/transactions`}
        method='post'
        id='iframe_form'
        style={{ display: 'none', opacity: 0, visibility: 'hidden' }}
        target={iframeId}
      >
        <input name='hmac' value={hash} readOnly={true}/>

        {Object.keys(fields).map(name => (
          <input key={name} name={name} value={fields[name]} readOnly={true} />
        ))}
      </form>
    );
  }

  private submitFormRef = (formRef: HTMLFormElement | null) => {
    if (formRef && !this.formSubmitted) {
      formRef.submit();
      this.formSubmitted = true;
    }
  }
}

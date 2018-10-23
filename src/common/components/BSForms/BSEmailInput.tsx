import * as React from 'react';

import { BSInput, IBSInputProps } from '@common/components/BSForms';

const locase = (value: string): string =>
  String(value || '').toLocaleLowerCase();

interface IBSEmailInputProps extends IBSInputProps {
  // tslint:disable-next-line no-reserved-keywords
  type?: 'email';
  onEmailLowercased?(actualEmail: string, locasedEmail: string): void;
}

interface IBSEmailInputState {
  filteredEmailValue: string;
}

export class BSEmailInput extends React.Component<IBSEmailInputProps, IBSEmailInputState> {
  public state: IBSEmailInputState = {
    filteredEmailValue: '',
  };

  public componentWillReceiveProps(props: IBSEmailInputProps) {
    this.props = props;

    const { value, field, formApi, onEmailLowercased } = props;

    const emailValue = value || formApi.stringValue(field);
    const locasedEmailValue = locase(emailValue);

    this.setState({
      filteredEmailValue: locasedEmailValue,
    });

    if (locasedEmailValue !== emailValue) {
      if (onEmailLowercased) {
        onEmailLowercased(emailValue, locasedEmailValue);
      }

      formApi.setValue(field, locasedEmailValue);
    }
  }

  public render() {
    const { onEmailLowercased, ...rest } = this.props;
    const { filteredEmailValue } = this.state;

    return (
      <BSInput
        {...rest}
        value={filteredEmailValue}
        type='email'
      />
    );
  }
}

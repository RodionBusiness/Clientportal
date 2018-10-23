import * as React from 'react';

import { AppLayout, AppTitle } from '@common/components';
import { RegistrationFormPanel, RegistrationSuccessPanel } from '@registration/components';
import { WaitingForRegistrationApprove } from '@registration/components/WaitingForRegistrationApprovePanel';
import { IRegistrationAppProps } from '@registration/containers/RegistrationAppContainer';
import { IRegistrationModel } from '@registration/core/models/RegistrationModel';
import { RouteComponentProps } from 'react-router';
import { FrejaRegistrationService } from '@common/components/FrejaAuthApprove/services/FrejaRegistrationService';

type AllProps = IRegistrationAppProps & RouteComponentProps<{}>;

export class RegistrationAppComponent extends React.Component<AllProps> {
  render() {
    const { isSent, sending } = this.props;

    return (
      <AppTitle append="Registration">
        <AppLayout theme="dark">
          {!isSent &&
            !sending && <RegistrationFormPanel onSubmit={this.onSubmit} loading={sending} />}
          {!isSent && sending && <WaitingForRegistrationApprove onCancel={this.onCancel} />}
          {isSent && <RegistrationSuccessPanel onGoBack={this.onGoBack} />}
        </AppLayout>
      </AppTitle>
    );
  }

  onSubmit = (data: IRegistrationModel) => {
    this.props.onSubmit(data);
  };

  onCancel = () => {
    FrejaRegistrationService.cancel();
  };

  onGoBack = () => {
    this.props.history.push('/pub-login');
  };
}

import * as React from 'react';

import { AppLayout, AppTitle, SmallLayoutContainer } from '@common/components';
import { DEFAULT_ALERT_NOTIFICATION_DELAY } from '@common/core/connectors';
import { LoginForm } from '@login/components';
import { FrejaAuthApproveComponent } from '@common/components/FrejaAuthApprove/components/FrejaAuthApproveComponent';
import { ILoginAppContainerProps } from '@login/containers/LoginAppContainer';
import { RouteComponentProps } from 'react-router';
import { ILoginModel } from '@login/core/models/ILoginModel';
import { FrejaAuthService } from '@common/components/FrejaAuthApprove/services/FrejaAuthService';
import { getPersistentSessionData, savePersistentSessionData } from '@login/services/LoginPersistentStorage';

type TLoginAppComponentParams = ILoginAppContainerProps & RouteComponentProps<{}>;

export class LoginAppComponent extends React.Component<TLoginAppComponentParams> {
  private locasedEmailNotificationTimestamp?: number;

  public render() {
    const { sending, isSent } = this.props;
    const sessionData = getPersistentSessionData()

    return (
      <AppTitle append="Login">
        <AppLayout theme="dark">
          <SmallLayoutContainer title={sending ? '' : 'Welcome'}>
            {sending && (
              <FrejaAuthApproveComponent onCancel={this.onApproveCancel} status="pending" />
            )}
            {!sending &&
              !isSent && (
                <LoginForm
                  disabled={false}
                  onSubmit={this.onSubmit}
                  onEmailLowercased={this.onEmailLowercased}
                  email={sessionData.email}
                  rememberEmail={sessionData.remember}
                />
              )}
            {!sending &&
              isSent && (
                <FrejaAuthApproveComponent onCancel={this.onApproveCancel} status="success" />
              )}
          </SmallLayoutContainer>
        </AppLayout>
      </AppTitle>
    );
  }

  private onApproveCancel = () => {
    FrejaAuthService.cancel();
  };

  private onEmailLowercased = () => {
    const now = Date.now();

    if (
      !this.locasedEmailNotificationTimestamp ||
      now > this.locasedEmailNotificationTimestamp + DEFAULT_ALERT_NOTIFICATION_DELAY
    ) {
      this.props.notifyError(
        `Email with uppercase letters is not allowed.
        It was converted to lowercase automatically.`
      );
      this.locasedEmailNotificationTimestamp = now;
    }
  };

  private onSubmit = async (data: ILoginModel) => {
    savePersistentSessionData({
      remember: data.rememberEmail,
      email: data.rememberEmail ? data.email : ''
    })

    this.props.onSubmit(data);
  };
}

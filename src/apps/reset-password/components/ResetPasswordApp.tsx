import { History } from 'history';
import * as queryString from 'query-string';
import * as React from 'react';
import { connect } from 'react-redux';

import { AppLayout, AppTitle } from '@common/components';
import { IDispatchNotifyActionsProps, mapDispatchNotifyActions } from '@common/core/connectors';
import { checkHash } from '@common/core/services';
import {
  InvalidHashScreen,
  ResetPasswordFormContainer,
  ResetPasswordSuccessPanel
} from '@reset-password/components';
import { resetPasswordServiceReset } from '@reset-password/core/services';
import { IResetPasswordFormData } from '@reset-password/core/types';
import { StatusPanel } from '@common/components/StatusPanel';

interface IRouteProps {
  location: Location;
  history: History;
}

interface IComponentOwnProps {
  hash: string;
  email: string;
}

interface IComponentOwnState {
  updated: boolean;
  submitting: boolean;
  showForm: boolean;
  hashChecking: boolean;
}

const mergeProps = (stateParams: any, dispatchParams: any, ownProps: IRouteProps) => {
  const params: any = queryString.parse(ownProps.location.search);

  return {
    ...stateParams,
    ...dispatchParams,
    ...ownProps,
    email: params.femail,
    hash: params.fhash
  };
};

type IComponentProps = IComponentOwnProps & IRouteProps & IDispatchNotifyActionsProps;

class ResetPasswordAppComponent extends React.Component<IComponentProps, IComponentOwnState> {
  public state: IComponentOwnState = {
    updated: false,
    submitting: false,
    showForm: false,
    hashChecking: true
  };

  private CHECK_HASH_DELAY = 250;

  public async componentDidMount() {
    this.checkHash();
  }

  public render() {
    const { email } = this.props;
    const { updated, submitting, showForm, hashChecking } = this.state;

    return (
      <AppTitle append="Reset Password">
        <AppLayout theme="dark">
          {showForm ? (
            !updated ? (
              <ResetPasswordFormContainer
                email={email}
                onSubmit={this.onSubmit}
                submitting={submitting}
              />
            ) : (
              <ResetPasswordSuccessPanel />
            )
          ) : hashChecking ? (
            <StatusPanel status="loading" title="Checking link..." />
          ) : (
            <InvalidHashScreen
              title="This link is outdated or was used"
              link="/pub-forgot-password"
              linkLabel="Get A New Link"
            />
          )}
        </AppLayout>
      </AppTitle>
    );
  }

  private onSubmit = async (data: IResetPasswordFormData) => {
    this.setState({ submitting: true });

    const { email, hash } = this.props;

    try {
      await resetPasswordServiceReset({
        ...data,
        email,
        hash
      });

      this.setState({ updated: true });
    } catch (err) {
      this.props.notifyError(err.message || String(err));
    }

    this.setState({ submitting: false });
  };

  private checkHash = async () => {
    const { hash, email } = this.props;

    this.setState({ hashChecking: true });

    try {
      const { result } = await checkHash(hash, email);
      await new Promise(resolve => setTimeout(resolve, this.CHECK_HASH_DELAY));
      if (result === 'None') {
        throw new Error('Hash or email not found');
      } else if (!isNaN(Number(result))) {
        this.setState({ showForm: true });
      } else {
        throw new Error('Cannot check link');
      }
    } catch (err) {
      this.props.notifyError(String(err));
      this.setState({ showForm: false });
    }

    this.setState({ hashChecking: false });
  };
}

export const ResetPasswordApp = connect(
  null,
  mapDispatchNotifyActions,
  mergeProps
)(ResetPasswordAppComponent);

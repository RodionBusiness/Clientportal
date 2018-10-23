import * as queryString from 'query-string';
import * as React from 'react';
import { connect } from 'react-redux';

import { AppLayout, AppTitle } from '@common/components';
import { IDispatchNotifyActionsProps, mapDispatchNotifyActions } from '@common/core/connectors';
import { checkHash } from '@common/core/services';
import { CompleteRegistrationSuccess } from '@complete-registration/components';
import { completeRegistration } from '@complete-registration/services';
import { InvalidHashScreen, StatusPanel } from '@reset-password/components';

interface IRouteProps {
  location: Location;
  history: History;
}

interface IComponentOwnProps {
  hash: string;
  email: string;
}

interface IComponentOwnState {
  completed: boolean;
  submitting: boolean;
  hashChecking: boolean;
  hashIsValid: boolean;
  errorMessage?: string;
}

const mergeProps = (stateParams: any, dispatchParams: any, ownProps: IRouteProps) => {
  const params: any = queryString.parse(ownProps.location.search);

  return {
    ...stateParams,
    ...dispatchParams,
    ...ownProps,
    hash: params.hash,
    email: params.email
  };
};

type IComponentProps = IComponentOwnProps & IRouteProps & IDispatchNotifyActionsProps;

class CompleteRegistrationAppComponent extends React.Component<
  IComponentProps,
  IComponentOwnState
> {
  public state: IComponentOwnState = {
    completed: false,
    submitting: false,
    hashChecking: true,
    hashIsValid: true
  };

  private CHECK_HASH_DELAY = 250;

  public async componentDidMount() {
    await this.checkHash();

    if (this.state.hashIsValid) {
      await this.completeRegistration();
    }
  }

  public render() {
    const { completed, submitting, hashChecking, hashIsValid, errorMessage } = this.state;
    const loading = submitting || hashChecking;

    return (
      <AppTitle append="Complete Registration">
        <AppLayout theme="dark">
          {loading && (
            <StatusPanel
              status="loading"
              title={hashChecking ? 'Checking link...' : 'Email confirmation...'}
            />
          )}

          {!loading &&
            (!hashIsValid || !completed) && (
              <InvalidHashScreen
                title={errorMessage || 'This link is outdated or was used'}
                link="/pub-registration"
                linkLabel="Back to Registration"
              />
            )}

          {completed && <CompleteRegistrationSuccess />}
        </AppLayout>
      </AppTitle>
    );
  }

  private completeRegistration = async () => {
    this.setState({ submitting: true });
    const { email, hash } = this.props;

    try {
      await completeRegistration({
        email,
        hash
      });

      this.setState({ completed: true });
    } catch (err) {
      let message = err.message || String(err);

      if (message === 'Could not find your email') {
        message = 'Could not find your email or link has been expired or used';
      }

      this.setState({ errorMessage: message });
      this.props.notifyError(message);
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
        this.setState({ hashIsValid: true });
      } else {
        throw new Error('Cannot check link');
      }
    } catch (err) {
      this.props.notifyError(String(err));
      this.setState({
        hashIsValid: false,
        errorMessage: String(err)
      });
    }

    this.setState({ hashChecking: false });
  };
}

export const CompleteRegistrationApp = connect(
  null,
  mapDispatchNotifyActions,
  mergeProps
)(CompleteRegistrationAppComponent);

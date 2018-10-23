import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { ApplRoutes } from '@appl/components/ApplRoutes';
import { connect as appConnect } from '@appl/core/actions';
import { menu } from '@appl/core/menu';
import { IApplState, IInitializationState, IUserState } from '@appl/core/types';
import { AppLayout, AppLoading, RedirectHref } from '@common/components';
import { filterMenuForRoles } from '@common/core/services';
import { IApplPopupAPI } from '@appl/components/Appl/ApplPopup';
import { ApplPopUpService, AppPopUpEnum } from '@appl/components/Appl/services/applPopUpService';
import { ApplFrejaApprovalPopup } from '@common/components/FrejaAuthApprove/components/ApplFrejaApprovalPopup';

interface IStateMap {
  initialization: IInitializationState;
  user: IUserState;
}

interface IDispatchMap {
  connect(): void;
}

class ApplRouterComponent extends React.Component<IStateMap & IDispatchMap> {
  private readonly leadUrl: string = '/appl-overview';

  public componentWillMount() {
    this.props.connect();
  }

  public render() {
    const { connected } = this.props.initialization;
    const { enabled, documentEnabled, roles } = this.props.user;

    const allowedMenu = filterMenuForRoles(menu, roles);

    let applLayout: React.ReactNode = '';

    if (connected) {
      if (!enabled) {
        applLayout = (
          <AppLayout theme="light" logoHref={this.leadUrl}>
            <RedirectHref to="/login?action=logout" />
          </AppLayout>
        );
      } else {
        // NOTE: `documentEnabled` is indirect attribute about user
        // who has been not onboard yet
        if (!documentEnabled) {
          applLayout = (
            <AppLayout theme="light" logoHref={this.leadUrl}>
              <RedirectHref to="/onboarding" />
            </AppLayout>
          );
        } else {
          applLayout = (
            <Router>
              <AppLayout theme="light" logoHref={this.leadUrl} menu={allowedMenu}>
                <ApplFrejaApprovalPopup apiRef={this.setPopUpRef} />
                <Switch>
                  {ApplRoutes(allowedMenu)}
                  <Redirect to="/appl-overview" />
                </Switch>
              </AppLayout>
            </Router>
          );
        }
      }
    }

    return (
      applLayout || (
        <AppLayout theme="light">
          <AppLoading />
        </AppLayout>
      )
    );
  }

  setPopUpRef = (frejaPopUpAPI: IApplPopupAPI) => {
    ApplPopUpService.register(AppPopUpEnum.FrejaApprove, frejaPopUpAPI);
  };
}

export const ApplRouter = connect(
  ({ initialization, user }: IApplState): IStateMap => ({ initialization, user }),
  (dispatch: ThunkDispatch<IApplState, never, AnyAction>): IDispatchMap => ({
    connect() {
      dispatch(appConnect());
    }
  })
)(ApplRouterComponent);

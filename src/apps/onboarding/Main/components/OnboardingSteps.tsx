import React from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { AppLayout, AppTitle } from '@common/components';
import { fetchOnboardingData } from '@onboarding/core/actions';
import { EOnboardingAccountType } from '@onboarding/core/enums';
import { IOnboardingStore } from '@onboarding/core/types';
import {
  OnboardingProgressProvider,
  withOnboardingProgressSelector,
} from '@onboarding/Main/components';
import { getOnboardingSteps } from '@onboarding/Main/values';

interface IStoreMap {
  type: EOnboardingAccountType;
  isPaidFee?: boolean;
}

interface IDispatchMap {
  initialize(): void;
}

export class OnboardingStepsComponent extends React.Component<IStoreMap & IDispatchMap> {

  public componentDidMount(): void {
    this.props.initialize();
  }

  public render(): React.ReactNode {
    const { type, isPaidFee } = this.props;
    return (
      <AppTitle append='Welcome Onboard!'>
        <AppLayout theme='dark' logoHref='/login?action=logout'>
          {(type !== EOnboardingAccountType.unknown)  && (
            <OnboardingProgressProvider steps={getOnboardingSteps(type, isPaidFee)}>
              {({ progress: { selectedStep: { Content } } }) => {
                const Component = withOnboardingProgressSelector(Content);
                return (<Component />);
              }}
            </OnboardingProgressProvider>
          )}
        </AppLayout>
      </AppTitle>
    );
  }

}

const mapStateToProps: MapStateToProps<IStoreMap, {}, IOnboardingStore> =
  ({ account: { type }, registrationData: { payment: { isPaidFee } } }) => ({ type, isPaidFee });

const mapDispatchToProps: MapDispatchToProps<IDispatchMap, {}> = (
  dispatch: ThunkDispatch<IOnboardingStore, never, AnyAction>,
) => ({

  initialize(): void {
    dispatch(fetchOnboardingData());
  },

});

export const OnboardingSteps = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OnboardingStepsComponent);

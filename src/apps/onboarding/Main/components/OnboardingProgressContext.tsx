import React from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { TMerge } from '@common/core/types';
import { setProgressStep } from '@onboarding/core/actions';
import { IOnboardingStore } from '@onboarding/core/types';
import { EOnboardingStep } from '@onboarding/Main/enums';
import { createOnboardingProgress, onboardingScrollTop } from '@onboarding/Main/helpers';
import { OnboardingProgressContextModel } from '@onboarding/Main/models';
import {
  IOnboardingProgressProviderProps,
  IOnboardingProgressProviderState,
  IOnboardingStepsContentProps,
  TOnboardingStepData,
} from '@onboarding/Main/types';

const { Provider, Consumer } = React.createContext<OnboardingProgressContextModel>({} as any);

type TPropsMap = IOnboardingProgressProviderProps & IPropsMap & IStoreMap;
type TStateMap = IOnboardingProgressProviderState;

interface IPropsMap {
  steps: TOnboardingStepData[];
  children(steps: OnboardingProgressContextModel): React.ReactNode;
}

interface IStoreMap {
  step: EOnboardingStep;
}

class OnboardingProgressProviderComponent extends React.Component<TPropsMap, TStateMap> {

  constructor(props: TPropsMap) {
    super(props);
    this.state = {
      progress: createOnboardingProgress(...props.steps),
    };
  }

  public static getDerivedStateFromProps(props: TPropsMap): TStateMap {
    return {
      progress: createOnboardingProgress(...props.steps).select(props.step),
    };
  }

  public render(): React.ReactNode {
    const context = new OnboardingProgressContextModel(this, undefined, onboardingScrollTop);
    return (
      <Provider value={context}>
        {this.props.children(context)}
      </Provider>
    );
  }

}

const mapStateToProps: MapStateToProps<IStoreMap, IPropsMap, IOnboardingStore> =
  ({ registration }) => ({ step: registration.step });

const mapDispatchToProps: MapDispatchToProps<IOnboardingProgressProviderProps, IPropsMap> = (
  dispatch: ThunkDispatch<IOnboardingStore, never, AnyAction>,
) => ({

  setStep(stepId: EOnboardingStep): void {
    dispatch(setProgressStep(stepId));
  },

});

export const OnboardingProgressProvider = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OnboardingProgressProviderComponent);

export const OnboardingProgressConsumer = Consumer;

export function withOnboardingProgressSelector<Props extends IOnboardingStepsContentProps>(
  Component: React.ComponentType<Props>,
): React.StatelessComponent<TMerge<Partial<IOnboardingStepsContentProps>, Props>> {
  return props => (
    <Consumer>
      {context => (<Component {...props} stepSubmit={context.getStepSubmitHandler()} />)}
    </Consumer>
  );
}

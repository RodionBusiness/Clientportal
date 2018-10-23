import React from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { SmallLayoutContainer, SmallLayoutContainerIcon } from '@common/components';
import { submitRegistrationData } from '@onboarding/core/actions';
import { IOnboardingStore } from '@onboarding/core/types';
import { IOnboardingStepsContentProps } from '@onboarding/Main/types';

type TPropsMap = IOnboardingStepsContentProps & IStoreMap & IDispatchMap;

interface IStoreMap {
  isSubmitted: boolean;
  isSubmitting: boolean;
}

interface IDispatchMap {
  submitData(): void;
}

class OnboardingCompleteIndividualComponent extends React.Component<TPropsMap> {

  constructor(props: TPropsMap) {
    super(props);
    if (!props.isSubmitted) {
      props.submitData();
    }
  }

  public render(): React.ReactNode {
    const { isSubmitted, isSubmitting } = this.props;
    return (
      <SmallLayoutContainer className='onboarding-panel-scroll-target'>
        <section className='text-center'>
          {isSubmitting && (
            <h3 className='mb-4'>
              Please, wait...
              <br />
              <small>Uploading data</small>
            </h3>
          )}
          {isSubmitted && (
            <React.Fragment>
              <SmallLayoutContainerIcon icon='mail' className='mt-5' />
              <h3 className='mb-4 helper__semibold'>
                Application received
              </h3>
              <div className='mb-5'>
                <p>
                  Your application is being processed.
                  <br />
                  You will have access to the client portal
                  <br />
                  once the application is approved.
                </p>
              </div>
            </React.Fragment>
          )}
        </section>
      </SmallLayoutContainer>
    );
  }

}

const mapStateToProps: MapStateToProps<IStoreMap, {}, IOnboardingStore> =
  ({ registration: { isSubmitting }, account: { isSubmitted } }) => ({ isSubmitting, isSubmitted });

const mapDispatchToProps: MapDispatchToProps<IDispatchMap, {}> = (
  dispatch: ThunkDispatch<IOnboardingStore, never, AnyAction>,
) => ({

  submitData(): void {
    dispatch(submitRegistrationData());
  },

});

export const OnboardingCompleteIndividual = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OnboardingCompleteIndividualComponent);

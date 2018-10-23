import React from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import {
  BSCheckboxInput,
  BSFormGroup,
  BSInput,
  BSNativeForm,
  BSSelect,
  IBSNativeFormDefaults,
} from '@common/components';
import { IDispatchNotifyActionsProps, mapDispatchNotifyActions } from '@common/core/connectors';
import { saveStepDataPersistent } from '@onboarding/core/actions';
import { IOnboardingStore, IRegistrationPollingData } from '@onboarding/core/types';
import { OnboardingLayout, OnboardingProgress } from '@onboarding/Main/components';
import { IOnboardingStepsContentProps } from '@onboarding/Main/types';
import {
  fileMarketParticipantAgreement,
  frequencyOfDepositsOptions,
  originBlockchainAssetsOptions,
  originOfCashDepositsOptions,
  originOfFundsEntityOptions,
  sizeOfYearlyDepositsOptions,
  whatPurposeOfRelationshipEntityOptions,
} from '@onboarding/Polling/values';

type TPropsMap =
  & IDispatchNotifyActionsProps
  & IOnboardingStepsContentProps
  & IStoreMap
  & IDispatchMap;

interface IStoreMap {
  polling: IRegistrationPollingData;
}

interface IDispatchMap {
  saveData(values: IRegistrationPollingData): void;
}

class OnboardingPollingCorporateComponent extends React.Component<TPropsMap> {

  public render(): React.ReactNode {
    const { polling } = this.props;
    return (
      <OnboardingLayout
        title='Complete participant onboarding process'
        className='onboarding-panel-scroll-target'
      >
        <OnboardingProgress />
        <BSNativeForm
          onSubmit={this.submitStep}
          defaults={polling as IBSNativeFormDefaults}
        >
          {formApi => (
            <section>
              <BSFormGroup formApi={formApi} field='fieldOfBusiness'>
                <BSInput
                  formApi={formApi}
                  field='fieldOfBusiness'
                  required={true}
                  formLabel='Field Of Business *'
                  placeholder='Field Of Business'
                />
              </BSFormGroup>
              <BSFormGroup formApi={formApi} field='originOfFunds'>
                <BSSelect
                  formApi={formApi}
                  field='originOfFunds'
                  required={true}
                  formLabel='Origin Of Funds *'
                  label='Choose option...'
                  options={originOfFundsEntityOptions}
                />
              </BSFormGroup>
              <BSFormGroup formApi={formApi} field='frequencyOfDeposits'>
                <BSSelect
                  formApi={formApi}
                  field='frequencyOfDeposits'
                  required={true}
                  formLabel='Frequency Of Deposits *'
                  label='Choose option...'
                  options={frequencyOfDepositsOptions}
                />
              </BSFormGroup>
              <BSFormGroup formApi={formApi} field='sizeOfYearlyDeposits'>
                <BSSelect
                  formApi={formApi}
                  field='sizeOfYearlyDeposits'
                  required={true}
                  formLabel='Size of Yearly Deposits *'
                  label='Choose option...'
                  options={sizeOfYearlyDepositsOptions}
                />
              </BSFormGroup>
              <BSFormGroup formApi={formApi} field='originOfCachDeposits'>
                <BSSelect
                  formApi={formApi}
                  field='originOfCachDeposits'
                  required={true}
                  formLabel='Origin of Cash Deposits *'
                  label='Choose option...'
                  options={originOfCashDepositsOptions}
                />
              </BSFormGroup>
              <BSFormGroup formApi={formApi} field='whatPurposeOfRelationship'>
                <BSSelect
                  formApi={formApi}
                  field='whatPurposeOfRelationship'
                  required={true}
                  formLabel='What is the purpose of the relationship? *'
                  label='Choose option...'
                  options={whatPurposeOfRelationshipEntityOptions}
                />
              </BSFormGroup>
              <BSFormGroup formApi={formApi} field='originBlockchainAssets'>
                <BSSelect
                  formApi={formApi}
                  field='originBlockchainAssets'
                  required={true}
                  formLabel='Origin of Bitcoin assets *'
                  label='Choose option...'
                  options={originBlockchainAssetsOptions}
                />
              </BSFormGroup>
              <div className='card form-group border-0'>
                <div className='card-body'>
                  <BSCheckboxInput
                    formApi={formApi}
                    field='termsAndConditions'
                    value='Yes'
                    required={true}
                  >
                    I have read, understood and approve the&nbsp;
                    <a
                      href={fileMarketParticipantAgreement}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      Market Participant Agreement
                    </a>
                  </BSCheckboxInput>
                </div>
              </div>
              <div className='card form-group border-0'>
                <div className='card-body'>
                  <BSCheckboxInput
                    formApi={formApi}
                    field='onboardingInitiativeAgreement'
                    value='Yes'
                    required={true}
                  >
                    I confirm that we/I have not been solicited by BlockSettle to become a
                    Market Participant and wish to apply for an account by our/my own initiative
                  </BSCheckboxInput>
                </div>
              </div>
              <BSFormGroup>
                <button
                  type='submit'
                  className='btn btn-primary btn-block'
                  disabled={!formApi.valid()}
                >
                  Complete
                </button>
              </BSFormGroup>
            </section>
          )}
        </BSNativeForm>
      </OnboardingLayout>
    );
  }

  private submitStep: (values: IRegistrationPollingData) => void = (values) => {
    const { saveData, stepSubmit } = this.props;
    saveData(values);
    stepSubmit();
  }

}

const mapStateToProps: MapStateToProps<IStoreMap, {}, IOnboardingStore> =
  ({ registrationData: { polling } }) => ({ polling });

const mapDispatchToProps: MapDispatchToProps<IDispatchNotifyActionsProps & IDispatchMap, {}> = (
  dispatch: ThunkDispatch<IOnboardingStore, never, AnyAction>,
) => ({

  ...mapDispatchNotifyActions(dispatch),

  saveData(values) {
    dispatch(saveStepDataPersistent('polling', values));
  },

});

export const OnboardingPollingCorporate = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OnboardingPollingCorporateComponent);

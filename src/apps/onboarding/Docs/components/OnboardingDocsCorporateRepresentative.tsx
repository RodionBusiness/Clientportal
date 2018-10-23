import React from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import {
  BSDatePicker,
  BSFormGroup,
  BSNativeForm,
  BSSelect,
  DropzoneContainer,
  IBSNativeFormDefaults,
  TOption,
} from '@common/components';
import { IDispatchNotifyActionsProps, mapDispatchNotifyActions } from '@common/core/connectors';
import { saveStepDataPersistent } from '@onboarding/core/actions';
import { IOnboardingStore, IRegistrationFilesRepresentativeData } from '@onboarding/core/types';
import { OnboardingDocsIntroCorporate } from '@onboarding/Docs/components';
import { createNewFileEntity, documentOptionsByNationalty } from '@onboarding/Docs/helpers';
import { OnboardingDocumentRequirementModel } from '@onboarding/Docs/models';
import { countryOptions, maxDateOfBirth } from '@onboarding/Info/values';
import { OnboardingLayout, OnboardingProgress } from '@onboarding/Main/components';
import { IOnboardingStepsContentProps } from '@onboarding/Main/types';

type TPropsMap =
  & IDispatchNotifyActionsProps
  & IOnboardingStepsContentProps
  & IStoreMap
  & IDispatchMap;

interface IStateMap {
  countryDocuments: OnboardingDocumentRequirementModel[];
  userIdTypeOptions: TOption[];
}

interface IStoreMap {
  filesRepresentative: IRegistrationFilesRepresentativeData;
}

interface IDispatchMap {
  saveData(values: IRegistrationFilesRepresentativeData): void;
}

class OnboardingDocsCorporateRepresentativeComponent extends React.Component<TPropsMap, IStateMap> {

  public render() {
    const { filesRepresentative } = this.props;
    return (
      <OnboardingLayout
        title='Complete participant onboarding process'
        className='onboarding-panel-scroll-target'
      >
        <OnboardingProgress />
        <BSNativeForm<{}, IRegistrationFilesRepresentativeData>
          onSubmit={this.submitStep}
          defaults={filesRepresentative as IBSNativeFormDefaults}
        >
          {(formApi) => {
            return (
              <section>
                <OnboardingDocsIntroCorporate />
                <h4>Representative ID and address</h4>
                <BSFormGroup formApi={formApi} field='corporateRepresentativeBirthday'>
                  <BSDatePicker
                    formApi={formApi}
                    field='corporateRepresentativeBirthday'
                    formLabel='Date Of Birth *'
                    placeholderText='Date Of Birth'
                    fullWidth={true}
                    required={true}
                    maxDate={maxDateOfBirth}
                    dateFormat='D MMM YYYY'
                  />
                </BSFormGroup>
                <BSFormGroup formApi={formApi} field='corporateRepresentativeNationality'>
                  <BSSelect
                    field='corporateRepresentativeNationality'
                    formLabel='Nationality *'
                    placeholder='Nationality'
                    label='Choose nationality...'
                    formApi={formApi}
                    options={countryOptions}
                    required={true}
                  />
                </BSFormGroup>
                <BSFormGroup formApi={formApi} field='corporateRepresentativeIdType'>
                  <BSSelect
                    field='corporateRepresentativeIdType'
                    label='Choose document type...'
                    formLabel='Document type *'
                    placeholder='Document type'
                    formApi={formApi}
                    required={true}
                    options={documentOptionsByNationalty(
                      formApi.stringValue('corporateRepresentativeNationality'),
                    )}
                  />
                </BSFormGroup>
                <DropzoneContainer
                  filename='company_representative_id'
                  formLabel='ID *'
                  required={true}
                  formApi={formApi}
                  field='corporateRepresentativeId'
                  beforeFileUpload={createNewFileEntity}
                  notifyError={this.notifyUploadError}
                />
                <DropzoneContainer
                  filename='company_representative_address_proof'
                  formLabel='Proof of address *'
                  required={true}
                  formApi={formApi}
                  field='corporateRepresentativeAddressProof'
                  beforeFileUpload={createNewFileEntity}
                  notifyError={this.notifyUploadError}
                />
                <BSFormGroup>
                  <button
                    type='submit'
                    className='btn btn-primary btn-block'
                    disabled={!formApi.valid()}
                  >
                    Continue
                  </button>
                </BSFormGroup>
              </section>
            );
          }}
        </BSNativeForm>
      </OnboardingLayout>
    );
  }

  private submitStep: (values: IRegistrationFilesRepresentativeData) => void = (values) => {
    const { saveData, stepSubmit } = this.props;
    saveData(values);
    stepSubmit();
  }

  private notifyUploadError: (filename: string) => void = (filename) => {
    this.props.notifyError(`Cannot upload ${filename}`);
  }

}

const mapStateToProps: MapStateToProps<IStoreMap, {}, IOnboardingStore> =
  ({ registrationData: { filesRepresentative } }) => ({ filesRepresentative });

const mapDispatchToProps: MapDispatchToProps<IDispatchNotifyActionsProps & IDispatchMap, {}> = (
  dispatch: ThunkDispatch<IOnboardingStore, never, AnyAction>,
) => ({

  ...mapDispatchNotifyActions(dispatch),

  saveData(values) {
    dispatch(saveStepDataPersistent('filesRepresentative', values));
  },

});

export const OnboardingDocsCorporateRepresentative = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OnboardingDocsCorporateRepresentativeComponent);

import React from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import {
  BSCheckboxInput,
  BSDatePicker,
  BSFormGroup,
  BSInput,
  BSNativeForm,
  BSSelect,
  DropzoneContainer,
  IBSNativeFormDefaults,
  TOption,
} from '@common/components';
import { IDispatchNotifyActionsProps, mapDispatchNotifyActions } from '@common/core/connectors';
import { saveStepDataPersistent } from '@onboarding/core/actions';
import { IOnboardingStore, IRegistrationFilesMembersData } from '@onboarding/core/types';
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
  filesMembers: IRegistrationFilesMembersData;
}

interface IDispatchMap {
  saveData(values: IRegistrationFilesMembersData): void;
}

class OnboardingDocsCorporateMembersComponent extends React.Component<TPropsMap, IStateMap> {

  public render() {
    const { filesMembers } = this.props;
    return (
      <OnboardingLayout
        title='Complete participant onboarding process'
        className='onboarding-panel-scroll-target'
      >
        <OnboardingProgress />
        <BSNativeForm<{}, IRegistrationFilesMembersData>
          onSubmit={this.submitStep}
          defaults={filesMembers as IBSNativeFormDefaults}
        >
          {(formApi) => {
            return (
              <section>
                <OnboardingDocsIntroCorporate />
                <h4>Two board members ID and address</h4>
                <BSFormGroup formApi={formApi} field='corporateMembersFirstName'>
                  <BSInput
                    formApi={formApi}
                    field='corporateMembersFirstName'
                    required={true}
                    formLabel='First board member name *'
                    placeholder='First board member name'
                  />
                </BSFormGroup>
                <BSFormGroup formApi={formApi} field='corporateMembersFirstBirthday'>
                  <BSDatePicker
                    formApi={formApi}
                    field='corporateMembersFirstBirthday'
                    formLabel='Date Of Birth *'
                    placeholderText='Date Of Birth'
                    fullWidth={true}
                    required={true}
                    maxDate={maxDateOfBirth}
                    dateFormat='D MMM YYYY'
                  />
                </BSFormGroup>
                <BSFormGroup formApi={formApi} field='corporateMembersFirstNationality'>
                  <BSSelect
                    field='corporateMembersFirstNationality'
                    formLabel='Nationality *'
                    placeholder='Nationality'
                    label='Choose nationality...'
                    formApi={formApi}
                    options={countryOptions}
                    required={true}
                  />
                </BSFormGroup>
                <BSFormGroup formApi={formApi} field='corporateMembersFirstIdType'>
                  <BSSelect
                    field='corporateMembersFirstIdType'
                    label='Choose document type...'
                    formLabel='Document type *'
                    placeholder='Document type'
                    formApi={formApi}
                    required={true}
                    options={documentOptionsByNationalty(
                      formApi.stringValue('corporateMembersFirstNationality'),
                    )}
                  />
                </BSFormGroup>
                <DropzoneContainer
                  filename='company_members_first_id'
                  formLabel='ID *'
                  required={true}
                  formApi={formApi}
                  field='corporateMembersFirstId'
                  beforeFileUpload={createNewFileEntity}
                  notifyError={this.notifyUploadError}
                />
                <DropzoneContainer
                  filename='company_members_first_address_proof'
                  formLabel='Proof of address *'
                  required={true}
                  formApi={formApi}
                  field='corporateMembersFirstAddressProof'
                  beforeFileUpload={createNewFileEntity}
                  notifyError={this.notifyUploadError}
                />
                <hr />
                <BSFormGroup formApi={formApi} field='corporateMembersSecondOmitted'>
                  <BSCheckboxInput
                    formApi={formApi}
                    field='corporateMembersSecondOmitted'
                    onValueChange={this.refresh}
                  >
                    Only one board member
                  </BSCheckboxInput>
                </BSFormGroup>
                {(formApi.value('corporateMembersSecondOmitted') !== true) && (
                  <React.Fragment>
                    <BSFormGroup formApi={formApi} field='corporateMembersSecondName'>
                      <BSInput
                        formApi={formApi}
                        field='corporateMembersSecondName'
                        required={true}
                        formLabel='Second board member name *'
                        placeholder='Second board member name'
                      />
                    </BSFormGroup>
                    <BSFormGroup formApi={formApi} field='corporateMembersSecondBirthday'>
                      <BSDatePicker
                        formApi={formApi}
                        field='corporateMembersSecondBirthday'
                        formLabel='Date Of Birth *'
                        placeholderText='Date Of Birth'
                        fullWidth={true}
                        required={true}
                        maxDate={maxDateOfBirth}
                        dateFormat='D MMM YYYY'
                      />
                    </BSFormGroup>
                    <BSFormGroup formApi={formApi} field='corporateMembersSecondNationality'>
                      <BSSelect
                        field='corporateMembersSecondNationality'
                        formLabel='Nationality *'
                        placeholder='Nationality'
                        label='Choose nationality...'
                        formApi={formApi}
                        options={countryOptions}
                        required={true}
                      />
                    </BSFormGroup>
                    <BSFormGroup formApi={formApi} field='corporateMembersSecondIdType'>
                      <BSSelect
                        field='corporateMembersSecondIdType'
                        label='Choose document type...'
                        formLabel='Document type *'
                        placeholder='Document type'
                        formApi={formApi}
                        required={true}
                        options={documentOptionsByNationalty(
                          formApi.stringValue('corporateMembersSecondNationality'),
                        )}
                      />
                    </BSFormGroup>
                    <DropzoneContainer
                      filename='company_members_first_id'
                      formLabel='ID *'
                      required={true}
                      formApi={formApi}
                      field='corporateMembersSecondId'
                      beforeFileUpload={createNewFileEntity}
                      notifyError={this.notifyUploadError}
                    />
                    <DropzoneContainer
                      filename='company_members_first_address_proof'
                      formLabel='Proof of address *'
                      required={true}
                      formApi={formApi}
                      field='corporateMembersSecondAddressProof'
                      beforeFileUpload={createNewFileEntity}
                      notifyError={this.notifyUploadError}
                    />
                  </React.Fragment>
                )}
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

  private submitStep: (values: IRegistrationFilesMembersData) => void = (values) => {
    const { saveData, stepSubmit } = this.props;
    saveData(values);
    stepSubmit();
  }

  private notifyUploadError: (filename: string) => void = (filename) => {
    this.props.notifyError(`Cannot upload ${filename}`);
  }

  private refresh: () => void = () => window.setTimeout(() => this.forceUpdate());

}

const mapStateToProps: MapStateToProps<IStoreMap, {}, IOnboardingStore> =
  ({ registrationData: { filesMembers } }) => ({ filesMembers });

const mapDispatchToProps: MapDispatchToProps<IDispatchNotifyActionsProps & IDispatchMap, {}> = (
  dispatch: ThunkDispatch<IOnboardingStore, never, AnyAction>,
) => ({

  ...mapDispatchNotifyActions(dispatch),

  saveData(values) {
    dispatch(saveStepDataPersistent('filesMembers', values));
  },

});

export const OnboardingDocsCorporateMembers = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OnboardingDocsCorporateMembersComponent);

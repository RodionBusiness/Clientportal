import React from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import {
  BSFormGroup,
  BSNativeForm,
  DropzoneContainer,
  IBSNativeFormAPI,
  IBSNativeFormDefaults,
  TOption,
} from '@common/components';
import { IDispatchNotifyActionsProps, mapDispatchNotifyActions } from '@common/core/connectors';
import { saveStepDataPersistent } from '@onboarding/core/actions';
import { IOnboardingStore, IRegistrationFilesOwnersData } from '@onboarding/core/types';
import {
  OnboardingDocsCorporateOwnersBeneficial,
  OnboardingDocsIntroCorporate,
} from '@onboarding/Docs/components';
import { createNewFileEntity } from '@onboarding/Docs/helpers';
import { OnboardingDocumentRequirementModel } from '@onboarding/Docs/models';
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
  filesOwners: IRegistrationFilesOwnersData;
}

interface IDispatchMap {
  saveData(values: IRegistrationFilesOwnersData): void;
}

class OnboardingDocsCorporateOwnersComponent extends React.Component<TPropsMap, IStateMap> {

  private formApi?: IBSNativeFormAPI;

  public render() {
    const { filesOwners } = this.props;
    return (
      <OnboardingLayout
        title='Complete participant onboarding process'
        className='onboarding-panel-scroll-target'
      >
        <OnboardingProgress />
        <BSNativeForm<{}, IRegistrationFilesOwnersData>
          apiRef={this.apiRef}
          onSubmit={this.submitStep}
          defaults={filesOwners as IBSNativeFormDefaults}
        >
          {(formApi) => {
            return (
              <section>
                <OnboardingDocsIntroCorporate />
                <h4>Beneficial owners and Shareholder register</h4>
                <p>
                  We are required to establish the beneficial owners of your company, that is the
                  individual or individuals that ultimately control over 25% of the company
                  (either by way of share ownership, agreements or other).
                </p>
                <p>
                  Add the personal information and respective percentage for each individual that
                  controls over 25% and upload a copy of their ID and address proof (such as a
                  utility bill, bank statement or other which is no more than 3 months old).
                </p>
                <p>
                  Should your company be owned by another company or chain of companies, kindly
                  upload the share registries for each entity so that the individuals that
                  ultimately control the company may be established.
                </p>
                <p>
                  In the event that no beneficial owner can be established using the share
                  percentage (such as for a company where no individual controls more than 25%)
                  enter the personal details of the Chairman of the Board or otherwise the CEO
                  and assign a 100% control percentage.
                </p>
                <OnboardingDocsCorporateOwnersBeneficial
                  formApi={formApi}
                  notifyError={this.notifyUploadError}
                  isRequired={true}
                />
                <hr />
                <h4>Other beneficial owners</h4>
                {Array(formApi.numberValue('corporateOwnersAdditionalBeneficialsCount') || 0)
                  .fill(0)
                  .map((_, index) => (
                    <OnboardingDocsCorporateOwnersBeneficial
                      key={index}
                      index={String(index)}
                      formApi={formApi}
                      notifyError={this.notifyUploadError}
                    />
                  ))}
                <BSFormGroup>
                  <button
                    type='button'
                    className='btn btn-primary btn-block'
                    onClick={this.addBeneficial}
                  >
                    Add more beneficial owners
                  </button>
                </BSFormGroup>
                <hr />
                <DropzoneContainer
                  filename='company_owners_shareholder_register'
                  formLabel='Shareholder register *'
                  required={true}
                  formApi={formApi}
                  field='corporateOwnersShareholderRegister'
                  beforeFileUpload={createNewFileEntity}
                  notifyError={this.notifyUploadError}
                />
                <hr />
                <h4>Additional documents</h4>
                {Array(formApi.numberValue('corporateOwnersAdditionalShareholderDocsCount') || 0)
                  .fill(0)
                  .map((_, index) => (
                    <DropzoneContainer
                      key={index}
                      filename={`company_owners_shareholder_doc_${index}`}
                      formLabel={`Document #${index + 1}`}
                      formApi={formApi}
                      field={`corporateOwnersShareholderDoc${index}`}
                      beforeFileUpload={createNewFileEntity}
                      notifyError={this.notifyUploadError}
                    />
                  ))}
                <BSFormGroup>
                  <button
                    type='button'
                    className='btn btn-primary btn-block'
                    onClick={this.addFiles}
                  >
                    Add more share register files
                  </button>
                </BSFormGroup>
                <hr />
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

  private submitStep: (values: IRegistrationFilesOwnersData) => void = (values) => {
    const { saveData, stepSubmit } = this.props;
    saveData(values);
    stepSubmit();
  }

  private notifyUploadError: (filename: string) => void = (filename) => {
    this.props.notifyError(`Cannot upload ${filename}`);
  }

  private apiRef: (formApi: IBSNativeFormAPI) => void = (formApi) => {
    this.formApi = formApi;
  }

  private addBeneficial: () => void = () => {
    if (this.formApi != null) {
      const value = this.formApi.numberValue('corporateOwnersAdditionalBeneficialsCount') || 0;
      this.formApi.setValue('corporateOwnersAdditionalBeneficialsCount', String(value + 1));
    }
  }

  private addFiles: () => void = () => {
    if (this.formApi != null) {
      const value = this.formApi.numberValue('corporateOwnersAdditionalShareholderDocsCount') || 0;
      this.formApi.setValue('corporateOwnersAdditionalShareholderDocsCount', String(value + 1));
    }
  }

}

const mapStateToProps: MapStateToProps<IStoreMap, {}, IOnboardingStore> =
  ({ registrationData: { filesOwners } }) => ({ filesOwners });

const mapDispatchToProps: MapDispatchToProps<IDispatchNotifyActionsProps & IDispatchMap, {}> = (
  dispatch: ThunkDispatch<IOnboardingStore, never, AnyAction>,
) => ({

  ...mapDispatchNotifyActions(dispatch),

  saveData(values) {
    dispatch(saveStepDataPersistent('filesOwners', values));
  },

});

export const OnboardingDocsCorporateOwners = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OnboardingDocsCorporateOwnersComponent);

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
import { IOnboardingStore, IRegistrationFilesInfoData } from '@onboarding/core/types';
import { OnboardingDocsIntroCorporate } from '@onboarding/Docs/components';
import { createNewFileEntity } from '@onboarding/Docs/helpers/onboardingDocsUtil';
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
  filesInfo: IRegistrationFilesInfoData;
}

interface IDispatchMap {
  saveData(values: IRegistrationFilesInfoData): void;
}

class OnboardingDocsCorporateInfoComponent extends React.Component<TPropsMap, IStateMap> {

  private formApi?: IBSNativeFormAPI;

  public render() {
    const { filesInfo } = this.props;
    return (
      <OnboardingLayout
        title='Complete participant onboarding process'
        className='onboarding-panel-scroll-target'
      >
        <OnboardingProgress />
        <BSNativeForm<{}, IRegistrationFilesInfoData>
          onSubmit={this.submitStep}
          apiRef={this.apiRef}
          defaults={filesInfo as IBSNativeFormDefaults}
        >
          {(formApi) => {
            return (
              <section>
                <OnboardingDocsIntroCorporate />
                <h4>Corporate documents</h4>
                <DropzoneContainer
                  filename='company_info_certificate'
                  formLabel='Certificate of incorporation *'
                  required={true}
                  formApi={formApi}
                  field='corporateInfoCertificate'
                  beforeFileUpload={createNewFileEntity}
                  notifyError={this.notifyUploadError}
                />
                <DropzoneContainer
                  filename='company_info_address_proof'
                  formLabel='Proof of company address *'
                  required={true}
                  formApi={formApi}
                  field='corporateInfoAddressProof'
                  beforeFileUpload={createNewFileEntity}
                  notifyError={this.notifyUploadError}
                />
                <DropzoneContainer
                  filename='company_info_directors_register'
                  formLabel='Register of directors *'
                  required={true}
                  formApi={formApi}
                  field='corporateInfoDirectorsRegister'
                  beforeFileUpload={createNewFileEntity}
                  notifyError={this.notifyUploadError}
                />
                <hr />
                <h4>Additional documents</h4>
                {Array(formApi.numberValue('corporateInfoAdditionalDocsCount') || 0)
                  .fill(0)
                  .map((_, index) => (
                    <DropzoneContainer
                      key={index}
                      filename={`company_info_doc_${index}`}
                      formLabel={`Document #${index + 1}`}
                      formApi={formApi}
                      field={`corporateInfoDoc${index}`}
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
                    Add more files
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

  private submitStep: (values: IRegistrationFilesInfoData) => void = (values) => {
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

  private addFiles: () => void = () => {
    if (this.formApi != null) {
      const value = this.formApi.numberValue('corporateInfoAdditionalDocsCount') || 0;
      this.formApi.setValue('corporateInfoAdditionalDocsCount', String(value + 1));
    }
  }

}

const mapStateToProps: MapStateToProps<IStoreMap, {}, IOnboardingStore> =
  ({ registrationData: { filesInfo } }) => ({ filesInfo });

const mapDispatchToProps: MapDispatchToProps<IDispatchNotifyActionsProps & IDispatchMap, {}> = (
  dispatch: ThunkDispatch<IOnboardingStore, never, AnyAction>,
) => ({

  ...mapDispatchNotifyActions(dispatch),

  saveData(values) {
    dispatch(saveStepDataPersistent('filesInfo', values));
  },

});

export const OnboardingDocsCorporateInfo = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OnboardingDocsCorporateInfoComponent);

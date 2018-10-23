import React from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import {
  BSFormGroup,
  BSNativeForm,
  BSSelect,
  DropzoneContainer,
  IBSNativeFormAPI,
  IBSNativeFormDefaults,
  TOption,
} from '@common/components';
import { IDispatchNotifyActionsProps, mapDispatchNotifyActions } from '@common/core/connectors';
import { saveStepDataPersistent } from '@onboarding/core/actions';
import {
  IOnboardingStore,
  IRegistrationContactData,
  IRegistrationFilesData,
} from '@onboarding/core/types';
import { OnboardingDocsIntroIndividual } from '@onboarding/Docs/components';
import { onboardingIdSide, onboardingIdType } from '@onboarding/Docs/enums';
import { documentOptionsByNationalty } from '@onboarding/Docs/helpers/onboardingDocsUtil';
import { OnboardingDocumentRequirementModel } from '@onboarding/Docs/models';
import { onboardingOnfidoService } from '@onboarding/Docs/services';
import { onboardingOnfidoDefaultDocs, onboardingOnfidoDocs } from '@onboarding/Docs/values';
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
  info: IRegistrationContactData;
  files: IRegistrationFilesData;
}

interface IDispatchMap {
  saveData(values: IRegistrationFilesData): void;
}

class OnboardingDocsIndividualComponent extends React.Component<TPropsMap, IStateMap> {

  private formApi?: IBSNativeFormAPI;

  constructor(props: TPropsMap) {
    super(props);
    const country = props.info.nationality;
    if (country == null) {
      return;
    }
    const countryDocuments = onboardingOnfidoDocs[country] || onboardingOnfidoDefaultDocs;
    this.state = {
      countryDocuments,
      userIdTypeOptions: documentOptionsByNationalty(country),
    };
  }

  public render() {
    const { files } = this.props;
    return (
      <OnboardingLayout
        title='Complete participant onboarding process'
        className='onboarding-panel-scroll-target'
      >
        <OnboardingProgress />
        <BSNativeForm<{}, IRegistrationFilesData>
          apiRef={this.setApiRef}
          onSubmit={this.submitStep}
          defaults={files as IBSNativeFormDefaults}
        >
          {(formApi) => {
            const userDocument = this.getCurrentUserDocument(formApi);
            if (userDocument == null) {
              return null;
            }
            return (
              <section>
                <OnboardingDocsIntroIndividual />
                {(this.state.userIdTypeOptions.length > 1) && (
                  <BSFormGroup>
                    <BSSelect
                      field='userIdType'
                      label='Choose document type...'
                      formLabel='Document type'
                      placeholder='Document type'
                      formApi={formApi}
                      required={true}
                      options={this.state.userIdTypeOptions}
                    />
                  </BSFormGroup>
                )}
                {userDocument.isFrontSideRequired && (
                  <DropzoneContainer
                    filename='proof_of_id'
                    formLabel={this.getUploadElementLabel(onboardingIdSide.front)}
                    required={true}
                    formApi={formApi}
                    field='proofOfID'
                    notifyError={this.notifyUploadError}
                    beforeFileUpload={this.checkUserIdProofFront}
                  />
                )}
                {userDocument.isBackSideRequired && (
                  <DropzoneContainer
                    filename='proof_of_id_alt'
                    formLabel={this.getUploadElementLabel(onboardingIdSide.back)}
                    required={true}
                    formApi={formApi}
                    field='proofOfIDAlt'
                    notifyError={this.notifyUploadError}
                    beforeFileUpload={this.checkUserIdProofBack}
                  />
                )}
                <DropzoneContainer
                  filename='proof_of_residency'
                  formLabel='Proof of Residency'
                  required={true}
                  formApi={formApi}
                  field='proofOfResidency'
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

  private submitStep: (values: IRegistrationFilesData) => void = (values) => {
    const { saveData, stepSubmit } = this.props;
    saveData(values);
    stepSubmit();
  }

  private notifyUploadError: (filename: string) => void = (filename) => {
    this.props.notifyError(`Cannot upload ${filename}`);
  }

  private getCurrentUserDocument: (
    (formApi?: IBSNativeFormAPI) => OnboardingDocumentRequirementModel | undefined
  ) = (formApi) => {
    const api = formApi || this.formApi;
    const userDocument = api && this.state.countryDocuments
      .find(doc => doc.docType === api.value('userIdType'));
    return userDocument || this.state.countryDocuments[0];
  }

  private getUploadElementLabel: (side: onboardingIdSide) => string = (side) => {
    const selectedDocument = this.getCurrentUserDocument();
    if (selectedDocument == null) {
      return '';
    }
    const label = selectedDocument.docTypeLabel;
    return selectedDocument.isBothSidesRequired
      ? `${label} (${OnboardingDocumentRequirementModel.getDocSideLabel(side)})`
      : label;
  }

  private checkUserIdProofFront: (file: File) => Promise<void> = async (file) => {
    await this.checkUserIdProof(file, onboardingIdSide.front);
  }

  private checkUserIdProofBack: (file: File) => Promise<void> = async (file) => {
    await this.checkUserIdProof(file, onboardingIdSide.back);
  }

  private checkUserIdProof: (
    (file: File, side: onboardingIdSide) => Promise<void>
  ) = async (file, side) => {
    const userDocument = this.getCurrentUserDocument();
    const docType = userDocument && userDocument.docType || onboardingIdType.passport;
    try {
      await onboardingOnfidoService.requestDocumentValidation(file, docType, side);
    } catch (error) {
      throw new Error(error);
    }
  }

  private setApiRef = (ref: IBSNativeFormAPI) => {
    this.formApi = ref;
  }

}

const mapStateToProps: MapStateToProps<IStoreMap, {}, IOnboardingStore> =
  ({ registrationData: { files, contacts } }) => ({ files, info: contacts });

const mapDispatchToProps: MapDispatchToProps<IDispatchNotifyActionsProps & IDispatchMap, {}> = (
  dispatch: ThunkDispatch<IOnboardingStore, never, AnyAction>,
) => ({

  ...mapDispatchNotifyActions(dispatch),

  saveData(values) {
    dispatch(saveStepDataPersistent('files', values));
  },

});

export const OnboardingDocsIndividual = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OnboardingDocsIndividualComponent);

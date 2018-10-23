import React from 'react';

import {
  BSDatePicker,
  BSFormGroup,
  BSInput,
  BSSelect,
  DropzoneContainer,
  IBSNativeFormAPI,
} from '@common/components';
import { createNewFileEntity, documentOptionsByNationalty } from '@onboarding/Docs/helpers';
import { countryOptions, maxDateOfBirth } from '@onboarding/Info/values';

interface IPropsMap {
  formApi: IBSNativeFormAPI;
  index?: string;
  isRequired?: boolean;
  notifyError(filename: string): void;
}

export const OnboardingDocsCorporateOwnersBeneficial: (
  React.StatelessComponent<IPropsMap>
) = (
  { formApi, notifyError, index = '', isRequired = false },
) => (
  <React.Fragment key={index}>
    <BSFormGroup formApi={formApi} field={`corporateOwnersName${index}`}>
      <BSInput
        formApi={formApi}
        field={`corporateOwnersName${index}`}
        formLabel={
          `Beneficial owner name ${index ? `#${Number(index) + 2}` : ''} ${isRequired ? '*' : ''}`}
        placeholder='Beneficial owner name'
        required={isRequired}
      />
    </BSFormGroup>
    <BSFormGroup formApi={formApi} field={`corporateOwnersControlPercent${index}`}>
      <BSInput
        type='number'
        min={0}
        max={100}
        formApi={formApi}
        field={`corporateOwnersControlPercent${index}`}
        formLabel={`Shareholder control % ${isRequired ? '*' : ''}`}
        placeholder='Shareholder control %'
        required={isRequired}
      />
    </BSFormGroup>
    <BSFormGroup formApi={formApi} field={`corporateOwnersNationality${index}`}>
      <BSSelect
        field={`corporateOwnersNationality${index}`}
        formLabel={`Nationality ${isRequired ? '*' : ''}`}
        placeholder='Nationality'
        label='Choose nationality...'
        formApi={formApi}
        options={countryOptions}
        required={isRequired}
      />
    </BSFormGroup>
    <BSFormGroup formApi={formApi} field={`corporateOwnersBirthday${index}`}>
      <BSDatePicker
        formApi={formApi}
        field={`corporateOwnersBirthday${index}`}
        formLabel={`Date Of Birth ${isRequired ? '*' : ''}`}
        placeholderText='Date Of Birth'
        fullWidth={true}
        maxDate={maxDateOfBirth}
        dateFormat='D MMM YYYY'
        required={isRequired}
      />
    </BSFormGroup>
    <BSFormGroup>
      <BSSelect
        field={`corporateOwnersIdType${index}`}
        label='Choose document type...'
        formLabel={`Document type ${isRequired ? '*' : ''}`}
        placeholder='Document type'
        required={isRequired}
        formApi={formApi}
        options={documentOptionsByNationalty(
          formApi.stringValue('corporateOwnersNationality'),
        )}
      />
    </BSFormGroup>
    <DropzoneContainer
      filename={`company_owners_id_${index}`}
      formLabel={`ID ${isRequired ? '*' : ''}`}
      formApi={formApi}
      field={`corporateOwnersId${index}`}
      beforeFileUpload={createNewFileEntity}
      notifyError={notifyError}
      required={isRequired}
    />
    <DropzoneContainer
      filename={`company_owners_address_proof_${index}`}
      formLabel={`Proof of address ${isRequired ? '*' : ''}`}
      formApi={formApi}
      field={`corporateOwnersAddressProof${index}`}
      beforeFileUpload={createNewFileEntity}
      notifyError={notifyError}
      required={isRequired}
    />
  </React.Fragment>
);

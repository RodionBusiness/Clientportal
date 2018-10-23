import React from 'react';

import {
  BSFormGroup,
  BSFormLabel,
  BSInput,
  BSRadioInput,
  IBSNativeFormAPI,
} from '@common/components';

interface IPropsMap {
  field: string;
  formApi: IBSNativeFormAPI;
  onValueChange(value: string): void;
}

export const OnboardingPollingYesNo: React.StatelessComponent<IPropsMap> = (
  { children, field, formApi, onValueChange },
) => (
  <div className='card form-group border-0'>
    <div className='card-body text-center'>
      <BSFormLabel>
        {children}
      </BSFormLabel>
      <BSInput
        className='d-none'
        field={field}
        formApi={formApi}
        pattern='^No$'
        required={true}
      />
      <BSFormGroup
        formApi={formApi}
        field={field}
        className='bs-inline-inputs justify-content-center mb-0'
      >
        <BSRadioInput
          formApi={formApi}
          field={field}
          formLabel='Yes'
          value=''
          required={true}
          onValueChange={onValueChange}
          className='mr-2'
        />
        <BSRadioInput
          formApi={formApi}
          field={field}
          formLabel='No'
          value='No'
          required={true}
          onValueChange={onValueChange}
          className='ml-3 mr-2'
        />
      </BSFormGroup>
    </div>
  </div>
);

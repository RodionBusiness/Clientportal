import * as React from 'react';

import '@common/styles/components/bs-checkbox-input.scss';

import { BSFormLabel, BSInput, IBSInputProps, wasValidated } from '@common/components/BSForms';
import { trimClassName } from '@common/core/helpers';

interface IBSCheckboxInputProps extends IBSInputProps {
  formLabel?: string;
}

export const BSCheckboxInput: React.StatelessComponent<IBSCheckboxInputProps> = ({
  formLabel,
  children,
  formApi,
  field,
  ...rest
}) => (
  <BSFormLabel
    check={true}
    className={trimClassName(`
      ${rest.required ? wasValidated({ formApi, field }) : ''}
      bs-checkbox-input
    `)}
  >
    <BSInput
      checked={formApi.value(field) === true}
      formApi={formApi}
      field={field}
      {...rest}
      type='checkbox'
    />
    <span className='bs-input__element' />
    <span>{children || formLabel}</span>
  </BSFormLabel>
);

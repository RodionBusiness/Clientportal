import * as React from 'react';
import { Input, Label, InputProps } from 'reactstrap';

import '@common/styles/components/bs-radio-input.scss';

import { IBSNativeFormAPI, TInputValue } from '@common/components/BSForms';

interface IBSRadioProps extends InputProps<{}> {
  size?: any;
  formApi: IBSNativeFormAPI;
  field: string;
  value?: string;
  defaultValue?: string;
  formLabel?: string;
  onValueChange?(value: TInputValue): void;
}

const BSInputPlain = ({
  formApi,
  field,
  value,
  defaultValue = '',
  onValueChange,
  ...rest
}: IBSRadioProps) => (
    <Input
      checked={formApi.value(field) === String(value || defaultValue || '')}
      name={field}
      {...rest}
      value={value || defaultValue}
      onChange={formApi.onChangeInput(field, onValueChange)}
      onBlur={formApi.touch(field)}
      type='radio'
    />
  );

export const BSRadioInput = ({
  formLabel,
  ...rest
}: IBSRadioProps) => (
  <Label className='bs-radio-input'>
    <BSInputPlain {...rest} />
    <span className='bs-input__element' />
    <span> {formLabel}</span>
  </Label>
);

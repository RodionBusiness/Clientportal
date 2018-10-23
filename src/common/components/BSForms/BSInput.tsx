import * as React from 'react';
import { Input, InputProps } from 'reactstrap';

import { BSFormLabel, IBSNativeFormAPI, TInputValue } from '@common/components/BSForms';

type TInputType =
  | 'text'
  | 'email'
  | 'select'
  | 'file'
  | 'radio'
  | 'checkbox'
  | 'textarea'
  | 'button'
  | 'reset'
  | 'submit'
  | 'date'
  | 'datetime-local'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'range'
  | 'search'
  | 'tel'
  | 'url'
  | 'week'
  | 'password'
  | 'datetime'
  | 'time'
  | 'color';

export interface IBSInputProps extends InputProps<{}> {
  // tslint:disable-next-line no-reserved-keywords
  type?: TInputType;
  size?: any;
  formApi: IBSNativeFormAPI;
  field: string;
  value?: string;
  formLabel?: React.ReactNode;
  onValueChange?(value: TInputValue): void;
}

const BSInputPlain = ({
  formApi,
  field,
  value,
  onValueChange,
  type = 'text',
  ...rest
}: IBSInputProps) => (
    <Input
      value={value || formApi.stringValue(field)}
      onChange={formApi.onChangeInput(field, onValueChange)}
      onBlur={formApi.touch(field)}
      type={type}
      name={field}
      {...rest}
    />
  );

export const BSInput = ({
  formLabel,
  ...rest
}: IBSInputProps) => (
  formLabel ? (
    <div>
      <BSFormLabel>{formLabel}</BSFormLabel>
      <BSInputPlain {...rest} />
    </div>
  ) : (
    <BSInputPlain {...rest}/>
  )
);

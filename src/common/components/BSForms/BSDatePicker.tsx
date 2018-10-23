import * as moment from 'moment';
import * as React from 'react';
import { default as ReactDatePicker, ReactDatePickerProps } from 'react-datepicker';

import '@common/styles/components/bs-datepicker.sass';

import { BSFormLabel, IBSNativeFormAPI } from '@common/components/BSForms';
import { TPartialOptionalOf } from '@common/core/types';

export const DATEPICKER_DATE_FORMAT = 'DD MMM YYYY';

// Use TPartialOptionalOf to prevent onChange requiring and 'bad implementation' errors
type IBSDatePickerProps = {
  field: string;
  formApi: IBSNativeFormAPI;
  formLabel?: string;
  fullWidth?: boolean;
} & TPartialOptionalOf<ReactDatePickerProps>;

// Handle date change and process with BSNativeFormAPI.
const onDateChange = (formApi: IBSNativeFormAPI, field: string) =>
  (date: moment.Moment | null): void =>
    formApi.setValue(field, date ? date.format() : void 0);

export const BSDatePickerPlain: React.StatelessComponent<IBSDatePickerProps> =
  ({
    className,
    formApi, field,
    maxDate = moment().endOf('day'),
    dateFormat = DATEPICKER_DATE_FORMAT,
    ...rest
  }) => (
    <ReactDatePicker
      {...rest}
      className={`form-control bs-datepicker__input ${className || ''}`}
      dateFormat={dateFormat}
      selected={formApi.stringValue(field) ? moment(formApi.stringValue(field)) : null}
      onChange={onDateChange(formApi, field)}
      peekNextMonth={true}
      showMonthDropdown={true}
      showYearDropdown={true}
      dropdownMode='select'
      maxDate={maxDate}
      popperPlacement='bottom'
      autoComplete='off'
    />
  );

const containerStyle = (fullWidth: boolean): string =>
  `${fullWidth ? 'react-datepicker--fullwidth' : ''}`;

export const BSDatePicker: React.StatelessComponent<IBSDatePickerProps> = ({
  formLabel,
  fullWidth,
  ...rest
}) => formLabel ? (
    <div className={containerStyle(fullWidth || false)}>
      <BSFormLabel>{formLabel}</BSFormLabel>
      <BSDatePickerPlain {...rest} />
    </div>
  ) : (
    <div className={containerStyle(fullWidth || false)}>
      <BSDatePickerPlain {...rest} />
    </div>
  );

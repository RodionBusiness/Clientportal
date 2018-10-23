import * as moment from 'moment';
import * as React from 'react';
import { Button, FormGroup } from 'reactstrap';

import '@appl/styles/appl-form.sass';

import { TInstrumentsList } from '@appl/core/types';
import { BSDatePicker, BSInput, BSNativeForm, BSSelect } from '@common/components';

export interface ISearchCriteria {
  tradeId: string;
  tradeDate: string;
  tradeStatus: string;
  tradeType: string;
  instrumentDisplayName: string;
}

interface ISearchProps {
  currencies: TInstrumentsList;
  onSearch(values: ISearchCriteria): void;
}

class BSTradesSearchForm extends BSNativeForm<{}, ISearchCriteria> {}

const TRADE_STATUS_OPTIONS = [
  { value: 'Filled' },
  { value: 'Void' },
];

const TRADE_TYPE_OPTIONS = [
  { value: 'FXTrade', label: 'Currency' },
  { value: 'ExchangeTrade', label: 'Equity' },
];

export const ApplTradesTableSearchForm: React.StatelessComponent<ISearchProps> = ({
  currencies,
  onSearch,
}) => (
  <BSTradesSearchForm
    onSubmit={onSearch}
    onChange={onSearch}
    defaults={{}}
    className='appl-form__search_form form-inline'
  >
    {formApi => (
      <FormGroup>
        <BSInput
          formApi={formApi}
          field='tradeId'
          placeholder='Trade ID'
          className='appl-form__search-input'
          size='12'
        />

        <div className='helper__pr--05rem' />

        <BSDatePicker
          field='tradeDate'
          formApi={formApi}
          placeholderText='Trade Date'
          maxDate={moment(formApi.stringValue('dateTo') || void 0).add(-1, 'day')}
        />

        <div className='helper__pr--05rem' />

        <BSSelect
          formApi={formApi}
          field='tradeStatus'
          label='Trade Status'
          options={TRADE_STATUS_OPTIONS}
        />

        <div className='helper__pr--05rem' />

        <BSSelect
          field='instrumentDisplayName'
          formApi={formApi}
          label='Instrument'
          options={currencies.map(value => ({ value }))}
        />

        <div className='helper__pr--05rem' />

        <BSSelect
          formApi={formApi}
          field='tradeType'
          label='Trade Type'
          options={TRADE_TYPE_OPTIONS}
        />

        <div className='helper__pr--05rem' />

        <Button color='primary' type='submit'>
          Search
        </Button>
      </FormGroup>
    )}
  </BSTradesSearchForm>
);

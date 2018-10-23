import * as React from 'react';

import { ApplOverviewTable, IApplOverviewTableCommonProps } from '@appl/components/ApplOverviewPanel';
import { TableCurrency } from '@common/core/types';

const isFiat = /SEK|JPY|EUR|GBP|USD/i;

export const ApplAccountReservationTable = (props: IApplOverviewTableCommonProps) => (
  <ApplOverviewTable
    apiRef={props.apiRef}
    title='Account Reservation'
    tableLayout='auto'
    fields={[
      { label: 'Account', fieldName: 'account_name' },
      { label: 'Date', fieldName: 'order_date', sortAs: Date },
      { label: 'Time', fieldName: 'order_time', sortAs: Number },
      { label: 'Inst', fieldName: 'instrument' },
      {
        label: 'Qty',
        fieldName: 'quantity',
        fieldType: TableCurrency,
        sortAs: Number,
        precision: row => isFiat.test(String(row.instrument)) ? 2 : 0,
      },
      {
        label: 'Price',
        fieldName: 'price',
        fieldType: TableCurrency,
        precision: row => isFiat.test(String(row.instrument)) ? 2 : 6,
      },
      { label: 'Status', fieldName: 'order_status' },
    ]}
    fetchingService='client_control'
    fetchingMethod='load_client_open_orders'
  />
);

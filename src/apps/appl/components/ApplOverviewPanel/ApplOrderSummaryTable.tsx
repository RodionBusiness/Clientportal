import * as React from 'react';

import { ApplOverviewTable, IApplOverviewTableCommonProps } from '@appl/components/ApplOverviewPanel';
import { TableCurrency } from '@common/core/types';

export const ApplOrderSummaryTable = (props: IApplOverviewTableCommonProps) => (
  <ApplOverviewTable
    apiRef={props.apiRef}
    title='Order Summary'
    fields={[
      { label: 'Account', fieldName: 'account_name' },
      { label: 'CCY', fieldName: 'fx_ccy' },
      { label: 'Buys', fieldName: 'sum_buy_quantity', fieldType: TableCurrency },
      { label: 'Buy Avg.', fieldName: 'average_buy', fieldType: TableCurrency },
      { label: 'Sells', fieldName: 'sum_sell_quantity', fieldType: TableCurrency },
      { label: 'Sell Avg.', fieldName: 'average_sell', fieldType: TableCurrency },
    ]}
    fetchingService='client_control'
    fetchingMethod='load_client_positions_grouped'
  />
);

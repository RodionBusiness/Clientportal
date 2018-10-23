import * as React from 'react';

import { ApplOverviewTable, IApplOverviewTableCommonProps } from '@appl/components/ApplOverviewPanel';

export const ApplEquityPositionSummaryTable = (props: IApplOverviewTableCommonProps) => (
  <ApplOverviewTable
    apiRef={props.apiRef}
    title='Equity Position Summary'
    fields={[
      { label: 'Account', fieldName: 'account_name' },
      { label: 'Equity', fieldName: 'equity' },
      { label: 'Qty', fieldName: 'sum_quantity', fieldType: Number, precision: 0 },
    ]}
    fetchingService='client_control'
    fetchingMethod='load_client_exchange_positions_grouped'
  />
);

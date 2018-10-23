
import * as React from 'react';

import { ApplOverviewTable, IApplOverviewTableCommonProps } from '@appl/components/ApplOverviewPanel';
import { TableCurrency } from '@common/core/types';

export const ApplCashPositionSummaryTable = (props: IApplOverviewTableCommonProps) => (
  <ApplOverviewTable
    apiRef={props.apiRef}
    title='Cash Position Summary'
    fields={[
      { label: 'Account', fieldName: 'account_name' },
      { label: 'CCY', fieldName: 'ccy' },
      { label: 'Total Cash', fieldName: 'local', fieldType: TableCurrency },
    ]}
    fetchingService='client_control'
    fetchingMethod='load_client_settlement_cash_group'
  />
);

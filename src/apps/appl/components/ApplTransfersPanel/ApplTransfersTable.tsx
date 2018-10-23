import { List } from 'immutable';
import * as React from 'react';

import { ApplPaginatedTablePanel } from '@appl/components/Appl';
import { ITableFieldMetaData, TableCurrency } from '@common/core/types';

const criteria = {};

export const ApplTransfersTable = () => (
  <ApplPaginatedTablePanel
    rowsPerPage={20}
    rpcService='client_registration_service'
    rpcMethod='load_cash_transfer_requests'
    fields={List<ITableFieldMetaData>([
      { fieldName: 'request_date', sortKey: 'request_date', label: 'Requested', sortAs: Date },
      { fieldName: 'request_type', sortKey: 'request_type', label: 'Type' },
      { fieldName: 'request_status', sortKey: 'request_status', label: 'Status' },
      { fieldName: 'from_account', label: 'From' },
      { fieldName: 'to_account', label: 'To' },
      { fieldName: 'to_amount', sortKey: 'to_amount', label: 'Amount', fieldType: TableCurrency },
      { fieldName: 'to_ccy', label: 'Ccy' },
      { fieldName: 'depo_id_wired', label: 'Deposit REFID' },
    ])}
    sortingInCriteria={true}
    initialSortBy='request_date'
    criteria={criteria}
  />
);

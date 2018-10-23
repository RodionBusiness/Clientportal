import { List } from 'immutable';
import * as React from 'react';

import { ApplPaginatedTablePanel, ApplTableSearchHeader, TTableDataMap } from '@appl/components/Appl';
import { getExternalAccountDetails } from '@appl/components/ApplAccountsPanel';
import { ITableFieldMetaData, pickLabelOptions } from '@common/core/types';

export class ApplAccountsTable extends React.Component {
  public state = { criteria: {} };

  public render() {
    return (
      <ApplPaginatedTablePanel
        titleAppend={(
          <ApplTableSearchHeader onSearch={this.search} hint='Search by Name' />
        )}
        model='Account'
        rowsPerPage={20}
        initialSortBy='name'
        initialSortAsc={true}
        fields={List<ITableFieldMetaData>([
          { fieldName: 'id', sortKey: 'id', label: '#', sortAs: Number },
          { fieldName: 'entity', sortKey: 'entity', label: 'Entity', ...pickLabelOptions },
          { fieldName: 'bank_account_name', sortKey: 'bank_account_name', label: 'Name' },
          { fieldName: 'name', sortKey: 'name', label: 'Description' },
          { fieldName: 'account_type', sortKey: 'account_type', label: 'Account Type' },
          { fieldName: 'account_no', sortKey: 'account_no', label: 'Account No' },
          { fieldName: 'details', sortKey: 'details', label: 'Details' },
        ])}
        criteria={this.state.criteria}
        requestData={this.requestData}
        mapData={this.mapData}
      />
    );
  }

  private search = (criteria: { name: string }) =>
    this.setState({ criteria })

  private requestData = () => ({ summary: null });

  private mapData: TTableDataMap = async ({ items, ...rest }) => ({
    items: await Promise.all(
      items.map(async (account) => {
        try {
          const { account_info: { bank_account_name } } =
            await getExternalAccountDetails(account.id, account.account_type);

          return {
            ...account,
            bank_account_name,
          };
        } catch (err) {
          // console.warn(`Error on fetching account details for "${account.name}":`, err);

          return account;
        }
      }),
    ),
    ...rest,
  })
}

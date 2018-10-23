import * as React from 'react';

import { ApplPanel, ApplReadOnlyTablePanel } from '@appl/components/Appl';
import { ApplBalancesSearchForm } from '@appl/components/ApplBalances/ApplBalancesSearchForm';
import { AppTitle, PageHeader, TOption } from '@common/components';
import { ITableData, ITableFieldMetaData } from '@common/core/types';

interface IApplApplBalancesPanelContainerProps {
  accountOptions: TOption[];
  data: ITableData;
  fields: ITableFieldMetaData[];
  sending: boolean;
  onSearchSubmit(values: any): void;
}

export const ApplBalancesPanelContainer: React.StatelessComponent<IApplApplBalancesPanelContainerProps>
  = ({ accountOptions, data, fields, sending, onSearchSubmit }) => (
    <ApplPanel>
      <AppTitle append='Balance History'>
        <PageHeader title='Balance History'/>

        <p className='mb-4'>
          Saved files will be available to view and download under Entity Files in
          the Account Management section.
        </p>

        <ApplReadOnlyTablePanel
          headerAppend={(
            <ApplBalancesSearchForm
              onSubmit={onSearchSubmit}
              runningAccountsOptions={accountOptions}
              sending={sending}
              exportRows={data}
              exportFields={fields}
            />
          )}
          table={{ data, fields }}
        />
      </AppTitle>
    </ApplPanel>
  );

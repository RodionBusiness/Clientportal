import * as React from 'react';

import { TReportColumns } from '@appl/core/types';
import { ITableData, ITableFieldMetaData } from '@common/core/types';

import { ApplPanel, ApplReadOnlyTablePanel } from '@appl/components/Appl';
import { ApplReportsSearchForm, IBSReportsSearchFormValues } from '@appl/components/ApplReportsPanel';
import { AppTitle, PageHeader } from '@common/components';

interface IApplReportsPanelContainerProps {
  data: ITableData;
  columns: TReportColumns;
  fields: ITableFieldMetaData[];
  sending: boolean;
  sortBy?: string;
  sortAsc?: boolean;
  onSearchSubmit(values: IBSReportsSearchFormValues): void;
}

export const ApplReportsPanelContainer: React.StatelessComponent<IApplReportsPanelContainerProps>
  = ({ data, fields, sending, columns, onSearchSubmit, sortBy, sortAsc }) => (
    <ApplPanel>
      <AppTitle append='Reports'>
        <PageHeader title='General Reports'/>

        <p className='mb-4'>
          Saved files will be available to view and download under Entity Files in the Account Management section.
        </p>

        <ApplReadOnlyTablePanel
          headerAppend={(
            <ApplReportsSearchForm
              onSubmit={onSearchSubmit}
              sending={sending}
              exportRows={data}
              exportCols={columns}
            />
          )}
          table={{ data, fields }}
          sortBy={sortBy}
          sortAsc={sortAsc}
        />
      </AppTitle>
    </ApplPanel>
  );

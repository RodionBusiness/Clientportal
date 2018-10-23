import * as React from 'react';

import { ApplPanel } from '@appl/components/Appl';
import { ApplAccountsTable } from '@appl/components/ApplAccountsPanel';
import { AppTitle, PageHeader } from '@common/components';

export const ApplAccountsPanel = () => (
  <ApplPanel>
    <AppTitle append='Accounts'>
      <PageHeader title='Accounts' />
      <ApplAccountsTable />
    </AppTitle>
  </ApplPanel>
);

import * as React from 'react';

import { ApplPanel } from '@appl/components/Appl';
import { ApplTradesTable } from '@appl/components/ApplTradesPanel';
import { AppTitle, PageHeader } from '@common/components';

export const ApplTradesPanel = () => (
  <ApplPanel>
    <AppTitle append='Trades'>
      <PageHeader title='Trade History' />
      <ApplTradesTable />
    </AppTitle>
  </ApplPanel>
);

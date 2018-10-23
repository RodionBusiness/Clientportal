import * as React from 'react';

import { ApplPanel } from '@appl/components/Appl';
import { ApplTransfersTable } from '@appl/components/ApplTransfersPanel';
import { AppTitle, PageHeader } from '@common/components';

export const ApplTransfersPanel = () => (
  <ApplPanel>
    <AppTitle append='Transfers'>
      <PageHeader title='Account Transfer Requests' />
      <ApplTransfersTable />
    </AppTitle>
  </ApplPanel>
);

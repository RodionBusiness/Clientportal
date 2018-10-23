import * as React from 'react';

import { ApplPanel } from '@appl/components/Appl';
import { ApplTFAForm } from '@appl/components/ApplTFA/ApplTFAForm';
import { AppTitle, PageHeader } from '@common/components';

export const ApplTFAPanel = () => (
  <ApplPanel>
    <AppTitle append='Two Factor Authentication'>
      <PageHeader title='Two Factor Authentication' />
      <ApplTFAForm />
    </AppTitle>
  </ApplPanel>
);

import * as React from 'react';

import { ApplPanel } from '@appl/components/Appl';
import { ApplFAQContent } from '@appl/components/ApplFAQ/ApplFAQContent';
import { AppTitle, PageHeader } from '@common/components';

export const ApplFAQPanel = () => (
  <ApplPanel>
    <AppTitle append='FAQ'>
      <PageHeader title='FAQ' />
      <ApplFAQContent />
    </AppTitle>
  </ApplPanel>
);

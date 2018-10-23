import * as React from 'react';

import { ApplPanel } from '@appl/components/Appl';
import { ApplChangePasswordForm } from '@appl/components/ApplChangePassword';
import { AppTitle, PageHeader } from '@common/components';

export const ApplChangePasswordPanel = () => (
  <ApplPanel>
    <AppTitle append='Change Password'>
      <PageHeader title='Change Password' />
      <ApplChangePasswordForm />
    </AppTitle>
  </ApplPanel>
);

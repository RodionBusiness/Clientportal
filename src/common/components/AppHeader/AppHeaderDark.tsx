import * as React from 'react';

import { AppHeaderLogo } from '@common/components/AppHeader';

interface IAppHeaderDarkProps {
  logoHref?: string;
}

export const AppHeaderDark = ({ logoHref }: IAppHeaderDarkProps) => (
  <div className='app_header app_header--dark'>
    <AppHeaderLogo size={100} href={logoHref}/>
  </div>
);

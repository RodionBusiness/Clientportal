import * as React from 'react';

import '@appl/styles/appl-panel.sass';

interface IApplPanelProps {
  children: React.ReactNode;
}

export const ApplPanel = ({ children }: IApplPanelProps) => (
  <div className='appl-panel'>
    {children}
  </div>
);

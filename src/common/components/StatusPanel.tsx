import * as React from 'react';

import { BSSpinner, SmallLayoutContainer } from '@common/components';

interface InProgressPanel {
  title: string;
  status: 'loading' | 'failure';
}

export const StatusPanel: React.StatelessComponent<InProgressPanel> = props => (
  <SmallLayoutContainer title={props.title}>
    <div className="text-center mb-3">
      <BSSpinner spin={true} className="text-muted" size="2x" />
    </div>
  </SmallLayoutContainer>
);

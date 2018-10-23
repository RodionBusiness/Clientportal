import * as React from 'react';

import { trimClassName } from '@common/core/helpers';

interface ISmallLayoutContainerIconProps {
  icon: string;
  className?: string;
}

export const SmallLayoutContainerIcon = (props: ISmallLayoutContainerIconProps) => (
  <div
    className={trimClassName(`
      small-layout-container__header-icon
      small-layout-container__header-icon-${props.icon}
      ${props.className}
    `)}
  />
);

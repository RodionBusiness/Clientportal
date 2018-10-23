import * as React from 'react';

import { trimClassName } from '@common/core/helpers';

interface IBSSpinnerProps {
  spin?: boolean;
  hide?: boolean;
  className?: string;
  size?: TBSSpinnerSize;
}

export type TBSSpinnerSize = 'sm' | 'lg' | '2x' | '3x' | '4x';

export const BSSpinner: React.StatelessComponent<IBSSpinnerProps> = ({
  spin,
  hide,
  className,
  size = 'lg',
}) => (
  <i
    className={trimClassName(`
      fa fa-circle-o-notch fa-fw
      fa-${size}
      ${spin ? 'fa-spin' : ''}
      ${hide ? 'd-none' : ''}
      ${className || ''}
    `)}
  />
);

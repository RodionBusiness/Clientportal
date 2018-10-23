import * as React from 'react';
import { Label, LabelProps } from 'reactstrap';

interface ISmallStrongLabelProps extends LabelProps<{}> {
  children: React.ReactNode;
  check?: boolean;
}

export const BSFormLabel: React.StatelessComponent<ISmallStrongLabelProps> = ({
  children,
  ...rest
}) => (
  <Label {...{ ...rest }}>{children}</Label>
);

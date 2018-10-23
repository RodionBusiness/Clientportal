import * as React from 'react';
import { FormGroup } from 'reactstrap';

import { IWasValidatedProps, wasValidated } from '@common/components/BSForms';

interface IBSFormGroup extends IWasValidatedProps {
  children?: React.ReactNode;
}

export const BSFormGroup = ({ children, formApi, field, className, ...rest }: IBSFormGroup) => (
  <FormGroup
    className={wasValidated({ formApi, field, className })}
    {...rest}
  >
    {children}
  </FormGroup>
);

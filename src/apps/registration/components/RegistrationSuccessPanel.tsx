import * as React from 'react';
import { Button } from 'reactstrap';
import { SmallLayoutContainer } from '@common/components';

interface IRegistrationSuccessPanelProps {
  onGoBack: () => void;
}

export const RegistrationSuccessPanel: React.StatelessComponent<
  IRegistrationSuccessPanelProps
> = props => (
  <SmallLayoutContainer title="You should receive an email shortly!" headerIcon="mail">
    <p className="text-center">
      Please check your inbox and follow the instructions to set a password to complete your
      registration.
    </p>
    <p className="mb-5 text-center">
      <b>Note!</b> If you have not received your verification mail within 10 minutes, please check
      your junk/spam email folder.
    </p>

    <Button block={true} color="primary" type="button" onClick={props.onGoBack}>
      Back to login page
    </Button>
  </SmallLayoutContainer>
);

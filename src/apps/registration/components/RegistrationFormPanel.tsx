import * as React from 'react';

import { SmallLayoutContainer, SmallLayoutContainerInfoToggle } from '@common/components';
import { RegistrationForm, RegistrationInfoBlock } from '@registration/components';
import { IRegistrationFormProps } from '@registration/components/RegistrationForm';

const getTitle = (infoOpened: boolean): React.ReactNode | string =>
  infoOpened ? (
    ''
  ) : (
    'Register as a Market Data Participant'
  );

export const RegistrationFormPanel = (props: IRegistrationFormProps) => (
  <SmallLayoutContainer>
    <SmallLayoutContainerInfoToggle title={getTitle}>
      {(infoOpened: boolean) => (infoOpened ?
        <RegistrationInfoBlock />
        :
        <RegistrationForm {...props}/>
      )}
    </SmallLayoutContainerInfoToggle >
  </SmallLayoutContainer >
);

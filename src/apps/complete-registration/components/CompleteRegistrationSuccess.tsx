import * as React from 'react';
import { Link } from 'react-router-dom';

import { SmallLayoutContainer } from '@common/components';

export const CompleteRegistrationSuccess: React.StatelessComponent = () => (
  <SmallLayoutContainer title='Registration complete'>
    <p className='mb-5 text-center'>
      Your are now registered as a Market Data Participant. Should you wish to be
      able to place orders with the service, please login and continue the onbording process.
    </p>

    <Link to='/pub-login' className='btn btn-primary btn-block'>
      Back to login page
    </Link>
  </SmallLayoutContainer>
);

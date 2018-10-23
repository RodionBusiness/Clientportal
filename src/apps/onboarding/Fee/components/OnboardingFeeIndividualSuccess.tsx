import * as React from 'react';
import { Button } from 'reactstrap';

interface IPropsMap {
  onContinue(): void;
}

export const OnboardingFeeIndividualSuccess: (
  React.StatelessComponent<IPropsMap>
) = ({ onContinue }) => (
  <section className='text-center'>
    <div className='mb-5' />
    <h3 className='mb-4 helper__semibold'>
      Your payment is now confirmed
    </h3>
    <p>
      Please, continue participant onboarding process.
    </p>
    <div className='mb-5' />
    <Button type='button' color='primary' block={true} onClick={onContinue}>
      Continue
    </Button>
  </section>
);

import * as React from 'react';

import { OnboardingLayout } from '@onboarding/Main/components';
import { IOnboardingStepsContentProps } from '@onboarding/Main/types';

export const OnboardingWelcomeIndividual: React.StatelessComponent<IOnboardingStepsContentProps> = (
  { stepSubmit },
) => (
  <OnboardingLayout
    title='Welcome to BlockSettle'
    className='onboarding-panel-scroll-target'
  >
    <section>
      <div className='mb-4'>
        <p>
          Your account is approved for market data access. The Terminal can now receive market
          data and trading interest disseminated in real-time. Should you wish to become a
          participant of our trading network and have access to our service, continue with the
          onboarding process, pay the non-refundable application fee of EUR 15, complete the
          ID verification and attach the requested documents for approval. You will need:
        </p>
        <ul>
          <li>Valid Passport</li>
          <li>Proof of Residency</li>
        </ul>
      </div>
      <p className='mb-4'>
        <em>
          * US citizens are currently not accepted as participants of the trading network
          due to SEC and FACTA compliance requirements.
        </em>
      </p>
      <p className='mb-4'>
        <em>
          * Residents in countries currently on the EU Commission Delegated Regulations list
          of High Risk Third Countries (2016/1675) are not accepted as participants due to
          compliance requirements.
        </em>
      </p>
      <button
        className='btn btn-primary btn-block'
        onClick={stepSubmit}
      >
        Continue
      </button>
    </section>
  </OnboardingLayout>
);

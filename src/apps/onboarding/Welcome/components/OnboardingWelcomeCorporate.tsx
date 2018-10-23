import * as React from 'react';

import { OnboardingLayout } from '@onboarding/Main/components';
import { IOnboardingStepsContentProps } from '@onboarding/Main/types';

export const OnboardingWelcomeCorporate: React.StatelessComponent<IOnboardingStepsContentProps> = (
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
          data and trading interest disseminated in real-time. Should your company wish to
          become a participant of our trading network and have access to our service, please
          complete the questionnaire and we will send you a list of documentation we require
          to complete the application, including:
        </p>
        <ul>
          <li>Certificate of Registration</li>
          <li>Register of Directors and Register of Shareholders</li>
          <li>Resolution by the Board of Directors to open an account</li>
          <li>
            The representative of the account shall submit a passport copy and proof of
            residency
          </li>
          <li>Passport copy and proof of residency for at least two board directors</li>
          <li>Passport copies and proof of residency for Beneficial owners</li>
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

import React from 'react';

import { SmallLayoutContainer, SmallLayoutContainerIcon } from '@common/components';
import { IOnboardingStepsContentProps } from '@onboarding/Main/types';

export const OnboardingCompleteCorporate: (
  React.StatelessComponent<IOnboardingStepsContentProps>
) = () => (
  <SmallLayoutContainer className='onboarding-panel-scroll-target'>
    <section className='text-center'>
      <SmallLayoutContainerIcon icon='mail' className='mt-5' />
      <h3 className='mb-4 helper__semibold'>
        You should receive an email shortly!
      </h3>
      <div className='mb-5'>
        <p>
          Please check your inbox for instructions relating to which
          documents we require to review your application.
        </p>
      </div>
    </section>
  </SmallLayoutContainer>
);

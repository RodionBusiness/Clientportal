import React from 'react';

/* tslint:disable:no-relative-imports */
import '../assets/OnboardingProgress.scss';

import { OnboardingProgressConsumer } from '@onboarding/Main/components';

export const OnboardingProgress: React.StatelessComponent<{}> = () => (
  <div className='onboarding-steps-progress'>
    <OnboardingProgressConsumer>
      {context => context.progress.availableSteps.map(({ id, Label }, index) => (
        <Label
          key={index}
          isSelected={context.progress.isSelectedStep(id)}
          isPassed={context.progress.isPassedStep(id)}
          onSelect={context.getStepSubmitHandler(id)}
        />
      ))}
    </OnboardingProgressConsumer>
  </div>
);

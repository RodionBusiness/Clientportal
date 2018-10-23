import React from 'react';

import { IOnboardingStepsLabelProps } from '@onboarding/Main/types';

export function onboardingStepsLabel(
  label: string,
): React.ComponentType<IOnboardingStepsLabelProps> {
  return ({ isSelected, isPassed, onSelect }) => (
    <div className='onboarding-steps-progress__step__container'>
      <div
        role='button'
        onClick={isPassed ? onSelect : undefined}
        children={label}
        className={`onboarding-steps-progress__step ${
          (isSelected || isPassed) ? 'onboarding-steps-progress__step--passed' : ''
        }`}
      />
    </div>
  );
}

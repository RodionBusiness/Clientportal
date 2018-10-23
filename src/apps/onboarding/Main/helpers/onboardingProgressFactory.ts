import {
  OnboardingProgressModel,
  OnboardingStepModel,
} from '@onboarding/Main/models';
import { TOnboardingStepData } from '@onboarding/Main/types';

export function createOnboardingProgress(
  ...steps: TOnboardingStepData[]
): OnboardingProgressModel {
  return new OnboardingProgressModel(
    steps.map(step => Object.assign(new OnboardingStepModel(step.id), step)),
  );
}

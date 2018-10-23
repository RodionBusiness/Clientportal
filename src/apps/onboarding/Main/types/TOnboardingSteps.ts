import { OnboardingStepModel } from '@onboarding/Main/models';

export type TOnboardingStepData =
  & Pick<OnboardingStepModel, 'id'>
  & Partial<OnboardingStepModel>;

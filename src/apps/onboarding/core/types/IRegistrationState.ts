import { EOnboardingStep } from '@onboarding/Main/enums';

export interface IRegistrationState {
  step: EOnboardingStep;
  isSubmitting: boolean;
}

import { EOnboardingStep } from '@onboarding/Main/enums';
import { OnboardingProgressModel } from '@onboarding/Main/models';

export interface IOnboardingStepsLabelProps {
  isSelected: boolean;
  isPassed: boolean;
  onSelect?(): void;
}

export interface IOnboardingStepsContentProps {
  stepSubmit(): () => void;
}

export interface IOnboardingProgressProviderProps {
  setStep(stepId?: EOnboardingStep): void;
}

export interface IOnboardingProgressProviderState {
  progress: OnboardingProgressModel;
}

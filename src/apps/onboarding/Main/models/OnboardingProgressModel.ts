import { EOnboardingStep } from '@onboarding/Main/enums';
import { OnboardingStepModel } from '@onboarding/Main/models';

export class OnboardingProgressModel {

  constructor(
    private readonly steps: OnboardingStepModel[],
    private readonly index: number = 0,
  ) {
    if (steps == null || steps.length === 0) {
      throw new Error('No steps were provided to [OnboardingProgressModel].');
    }
    this.index = Math.max(0, Math.min(index, steps.length));
  }

  public get availableSteps(): OnboardingStepModel[] {
    return this.steps.filter(({ isAbstract }) => !isAbstract);
  }

  public get selectedStep(): OnboardingStepModel {
    return this.steps[this.index] || this.steps[0];
  }

  public get nextStep(): OnboardingStepModel {
    return this.steps[this.index + 1] || this.steps[0];
  }

  public getStep(stepId: EOnboardingStep): OnboardingStepModel {
    const result = this.steps.find(step => step.id === stepId);
    if (result == null) {
      throw new Error(`No step was found with [${stepId.toString()}] identifier.`);
    }
    return result;
  }

  public isPassedStep(stepId: EOnboardingStep): boolean {
    return this.steps.findIndex(step => step.id === stepId) < this.index;
  }

  public isSelectedStep(stepId: EOnboardingStep): boolean {
    const selected = this.steps[this.index];
    return Boolean(selected) && selected.id === stepId;
  }

  public select(stepId: EOnboardingStep): OnboardingProgressModel {
    const index = this.steps.findIndex(step => step.id === stepId);
    return (index !== -1 && index !== this.index)
      ? new OnboardingProgressModel(this.steps, index)
      : this;
  }

}

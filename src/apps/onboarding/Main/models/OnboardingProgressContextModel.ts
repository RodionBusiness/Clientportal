import { EOnboardingStep } from '@onboarding/Main/enums';
import { OnboardingProgressModel } from '@onboarding/Main/models';
import {
  IOnboardingProgressProviderProps as IPropsMap,
  IOnboardingProgressProviderState as IStateMap,
} from '@onboarding/Main/types';

type TStepChangeHandler = (
  prevStepId: EOnboardingStep,
  nextStepId?: EOnboardingStep,
) => EOnboardingStep | void;

export class OnboardingProgressContextModel {

  constructor(
    private readonly Provider: React.Component<IPropsMap, IStateMap>,
    private readonly beforeStepSubmit: TStepChangeHandler = () => undefined,
    private readonly atferStepSubmit: TStepChangeHandler = () => undefined,
  ) {}

  public get progress(): OnboardingProgressModel {
    return this.Provider.state.progress;
  }

  public getStepSubmitHandler(
    nextStepId: EOnboardingStep = this.Provider.state.progress.nextStep.id,
  ): () => void {
    return () => {
      const prevStepId = this.Provider.state.progress.selectedStep.id;
      const stepId = this.beforeStepSubmit(prevStepId, nextStepId);
      if (stepId !== prevStepId && nextStepId != null) {
        this.Provider.props.setStep(stepId || nextStepId);
        this.atferStepSubmit(prevStepId, stepId || nextStepId);
      }
    };
  }

}

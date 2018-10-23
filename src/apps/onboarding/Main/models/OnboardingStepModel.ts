import React from 'react';

import { EOnboardingStep } from '@onboarding/Main/enums';
import { IOnboardingStepsContentProps, IOnboardingStepsLabelProps } from '@onboarding/Main/types';

const DummyComponent = () => null;

export class OnboardingStepModel<
  LabelProps extends IOnboardingStepsLabelProps = IOnboardingStepsLabelProps,
  ContentProps extends IOnboardingStepsContentProps = IOnboardingStepsContentProps,
> {

  public Label: React.ComponentType<LabelProps> = DummyComponent;
  public Content: React.ComponentType<ContentProps> = DummyComponent;

  constructor(public readonly id: EOnboardingStep) {}

  public get isAbstract(): boolean {
    return this.Label === DummyComponent;
  }

  public get isEmpty(): boolean {
    return this.Content === DummyComponent;
  }

}

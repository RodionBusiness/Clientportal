import {
  OnboardingCompleteCorporate,
  OnboardingCompleteIndividual,
} from '@onboarding/Complete/components';
import { EOnboardingAccountType } from '@onboarding/core/enums';
import {
  OnboardingDocsCorporateInfo,
  OnboardingDocsCorporateMembers,
  OnboardingDocsCorporateOwners,
  OnboardingDocsCorporateRepresentative,
  OnboardingDocsIndividual,
} from '@onboarding/Docs/components';
import { OnboardingFeeIndividual } from '@onboarding/Fee/components';
import {
  OnboardingInfoCorporate,
  OnboardingInfoIndividual,
} from '@onboarding/Info/components';
import { onboardingStepsLabel } from '@onboarding/Main/components';
import { EOnboardingStep } from '@onboarding/Main/enums';
import { TOnboardingStepData } from '@onboarding/Main/types';
import {
  OnboardingPollingCorporate,
  OnboardingPollingIndividual,
} from '@onboarding/Polling/components';
import {
  OnboardingWelcomeCorporate,
  OnboardingWelcomeIndividual,
} from '@onboarding/Welcome/components';

const onboardingStepsIndividual: TOnboardingStepData[] = [
  {
    id: EOnboardingStep.welcomeIndividual,
    Content: OnboardingWelcomeIndividual,
  },
  {
    id: EOnboardingStep.infoIndividual,
    Label: onboardingStepsLabel('1'),
    Content: OnboardingInfoIndividual,
  },
  {
    id: EOnboardingStep.pollingIndividual,
    Label: onboardingStepsLabel('2'),
    Content: OnboardingPollingIndividual,
  },
  {
    id: EOnboardingStep.docsIndividual,
    Label: onboardingStepsLabel('3'),
    Content: OnboardingDocsIndividual,
  },
  {
    id: EOnboardingStep.feeIndividual,
    Label: onboardingStepsLabel('4'),
    Content: OnboardingFeeIndividual,
  },
  {
    id: EOnboardingStep.congratulationsIndividual,
    Content: OnboardingCompleteIndividual,
  },
];

const onboardingStepsIndividualPaid: TOnboardingStepData[] = [
  {
    id: EOnboardingStep.welcomeIndividual,
    Content: OnboardingWelcomeIndividual,
  },
  {
    id: EOnboardingStep.infoIndividual,
    Label: onboardingStepsLabel('1'),
    Content: OnboardingInfoIndividual,
  },
  {
    id: EOnboardingStep.pollingIndividual,
    Label: onboardingStepsLabel('2'),
    Content: OnboardingPollingIndividual,
  },
  {
    id: EOnboardingStep.docsIndividual,
    Label: onboardingStepsLabel('3'),
    Content: OnboardingDocsIndividual,
  },
  {
    id: EOnboardingStep.congratulationsIndividual,
    Content: OnboardingCompleteIndividual,
  },
];

const onboardingStepsCorporate: TOnboardingStepData[] = [
  {
    id: EOnboardingStep.welcomeCorporate,
    Content: OnboardingWelcomeCorporate,
  },
  {
    id: EOnboardingStep.docsInfoCorporate,
    Label: onboardingStepsLabel('1'),
    Content: OnboardingDocsCorporateInfo,
  },
  {
    id: EOnboardingStep.docsRepresentativeCorporate,
    Label: onboardingStepsLabel('2'),
    Content: OnboardingDocsCorporateRepresentative,
  },
  {
    id: EOnboardingStep.docsMembersCorporate,
    Label: onboardingStepsLabel('3'),
    Content: OnboardingDocsCorporateMembers,
  },
  {
    id: EOnboardingStep.docsOwnersCorporate,
    Label: onboardingStepsLabel('4'),
    Content: OnboardingDocsCorporateOwners,
  },
  {
    id: EOnboardingStep.infoCorporate,
    Label: onboardingStepsLabel('5'),
    Content: OnboardingInfoCorporate,
  },
  {
    id: EOnboardingStep.pollingCorporate,
    Label: onboardingStepsLabel('6'),
    Content: OnboardingPollingCorporate,
  },
  {
    id: EOnboardingStep.congratulationsCorporate,
    Content: OnboardingCompleteCorporate,
  },
];

export function getOnboardingSteps(
  type: EOnboardingAccountType,
  isPaidFee: boolean = false,
): TOnboardingStepData[] {
  switch (type) {
    case EOnboardingAccountType.individual: {
      return isPaidFee ? onboardingStepsIndividualPaid : onboardingStepsIndividual;
    }
    case EOnboardingAccountType.corporate: {
      return onboardingStepsCorporate;
    }
    default: return [];
  }
}

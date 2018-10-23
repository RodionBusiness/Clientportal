import { onboardingIdSide, onboardingIdType } from '@onboarding/Docs/enums';

type TIdTypeLabel = {
  [prop in onboardingIdType]: string;
};

type TIdSideLabel = {
  [prop in onboardingIdSide]: string;
};

export const onboardingIdTypeLabel: TIdTypeLabel = {
  [onboardingIdType.passport]: 'Passport',
  [onboardingIdType.identity]: 'National Identity Card',
  [onboardingIdType.ukResidence]: 'Biometric Residence Permit',
  [onboardingIdType.voterId]: 'Voter ID',
  [onboardingIdType.taxId]: 'Tax Identity Card (PAN)',
  [onboardingIdType.driving]: 'Driving Licence',
  [onboardingIdType.face]: 'Face',
};

export const onboardingIdSideLabel: TIdSideLabel = {
  [onboardingIdSide.front]: 'Front side',
  [onboardingIdSide.back]: 'Back side',
};

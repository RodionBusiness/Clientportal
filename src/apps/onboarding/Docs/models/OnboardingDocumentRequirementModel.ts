import { onboardingIdSide, onboardingIdType } from '@onboarding/Docs/enums';
import {
  onboardingIdSideLabel,
  onboardingIdTypeLabel,
} from '@onboarding/Docs/values/onboardingIdLabel';

export class OnboardingDocumentRequirementModel {

  public docType: onboardingIdType;
  public docSides: onboardingIdSide[] = [onboardingIdSide.front];

  constructor(
    docType: OnboardingDocumentRequirementModel['docType'] = onboardingIdType.passport,
    ...docSides: OnboardingDocumentRequirementModel['docSides']
  ) {
    this.docType = docType;
    if (docSides.length > 0) {
      this.docSides = docSides;
    }
  }

  public static getDocSideLabel(side: onboardingIdSide): string {
    return onboardingIdSideLabel[side];
  }

  public get isFrontSideRequired(): boolean {
    return this.docSides.includes(onboardingIdSide.front);
  }

  public get isBackSideRequired(): boolean {
    return this.docSides.includes(onboardingIdSide.back);
  }

  public get isBothSidesRequired(): boolean {
    return this.isFrontSideRequired && this.isBackSideRequired;
  }

  public get docTypeLabel(): string {
    return onboardingIdTypeLabel[this.docType];
  }

}

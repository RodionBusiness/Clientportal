import { IDocument } from '@common/core/types';
import { onboardingIdType } from '@onboarding/Docs/enums';

export interface IRegistrationContactData {
  nationality?: string;
  dateOfBirth?: string;
  swedenPersonalId?: string;
  domincle?: string;
  companyRegistrationNumber?: string;
  address?: string;
  address2?: string;
  postcode?: string;
  city?: string;
  country?: string;
  phone?: string;
}

export interface IRegistrationPollingData {
  isUSTaxResident?: string;
  isPEP?: string;
  fromHighRiskThirdCountry?: string;
  occupation?: string;
  fieldOfBusiness?: string;
  originOfFunds?: string;
  frequencyOfDeposits?: string;
  sizeOfYearlyDeposits?: string;
  originOfCachDeposits?: string;
  whatPurposeOfRelationship?: string;
  originBlockchainAssets?: string;
  termsAndConditions?: boolean;
  onboardingInitiativeAgreement?: boolean;
}

export interface IRegistrationFeeData {
  orderReference?: string;
  isPaidFee?: boolean;
}

export interface IRegistrationFilesData {
  userIdType?: onboardingIdType;
  proofOfID?: IDocument;
  proofOfIDAlt?: IDocument;
  proofOfResidency?: IDocument;
}

export interface IRegistrationFilesInfoData {
  [prop: string]: string | IDocument | undefined;
  corporateInfoCertificate?: IDocument;
  corporateInfoAddressProof?: IDocument;
  corporateInfoDirectorsRegister?: IDocument;
  corporateInfoAdditionalDocsCount?: string;
}

export interface IRegistrationFilesRepresentativeData {
  corporateRepresentativeNationality?: string;
  corporateRepresentativeIdType?: string;
  corporateRepresentativeBirthday?: string;
  corporateRepresentativeId?: IDocument;
  corporateRepresentativeAddressProof?: IDocument;
}

export interface IRegistrationFilesMembersData {
  corporateMembersFirstName?: string;
  corporateMembersFirstNationality?: string;
  corporateMembersFirstIdType?: string;
  corporateMembersFirstBirthday?: string;
  corporateMembersFirstId?: IDocument;
  corporateMembersFirstAddressProof?: IDocument;
  corporateMembersSecondOmitted?: boolean;
  corporateMembersSecondName?: string;
  corporateMembersSecondNationality?: string;
  corporateMembersSecondIdType?: string;
  corporateMembersSecondBirthday?: string;
  corporateMembersSecondId?: IDocument;
  corporateMembersSecondAddressProof?: IDocument;
}

export interface IRegistrationFilesOwnersData {
  [prop: string]: string | IDocument | undefined;
  corporateOwnersName?: string;
  corporateOwnersControlPercent?: string;
  corporateOwnersNationality?: string;
  corporateOwnersIdType?: string;
  corporateOwnersBirthday?: string;
  corporateOwnersId?: IDocument;
  corporateOwnersAddressProof?: IDocument;
  corporateOwnersShareholderRegister?: IDocument;
  corporateOwnersAdditionalBeneficialsCount?: string;
  corporateOwnersAdditionalShareholderDocsCount?: string;
}

export interface IApplicationFeePayment {
  isPaidFee?: boolean;
  orderReference?: string;
}
export type TRegistrationDataSection =
  | IRegistrationContactData
  | IRegistrationPollingData
  | IRegistrationFilesData
  | IRegistrationFilesInfoData
  | IRegistrationFilesRepresentativeData
  | IRegistrationFilesMembersData
  | IApplicationFeePayment;

export interface IRegistrationData {
  contacts: IRegistrationContactData;
  polling: IRegistrationPollingData;
  files: IRegistrationFilesData;
  filesInfo: IRegistrationFilesInfoData;
  filesRepresentative: IRegistrationFilesRepresentativeData;
  filesMembers: IRegistrationFilesMembersData;
  filesOwners: IRegistrationFilesOwnersData;
  payment: IApplicationFeePayment;
}

export type IRegistrationDataSectionName = keyof IRegistrationData;

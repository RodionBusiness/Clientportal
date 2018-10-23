import { EOnboardingAccountType } from '@onboarding/core/enums';
import { mapDateFieldTo, mapDocumentTo } from '@onboarding/core/mappers';
import {
  IRegistrationAccountAddr,
  IRegistrationAccountInfo,
  IRegistrationClientPersonInfo,
  IRegistrationContactAddr,
  IRegistrationContactCach,
  IRegistrationContactInfo,
  IRegistrationData,
  IRegistrationDetails,
  IRegistrationEntity,
  IRegistrationEntityAddr,
  IRegistrationEntityCash,
  IRegistrationEntityInfo,
  IRegistrationWalletInfo,
  TDocFile,
  TDocFiles,
} from '@onboarding/core/types';
import { onboardingIdType } from '@onboarding/Docs/enums';

interface IRegistrationDetailsTo {
  a_cp: null | IRegistrationClientPersonInfo;
  docs: TDocFiles | {
    id_1?: TDocFile;
    id_2?: TDocFile;
    'Proof of Residency'?: TDocFile;
  };
  an_entity: null | IRegistrationEntity;
  ent_info: null | IRegistrationEntityInfo;
  ent_addr: null | IRegistrationEntityAddr;
  con_addr: IRegistrationContactAddr;
  con_info: IRegistrationContactInfo;
  ent_docs: null | TDocFiles;
  ext_acct: null | IRegistrationAccountInfo;
  wallet_acct: null | IRegistrationWalletInfo;
  acct_addr: null | IRegistrationAccountAddr;
  con_cash: null | IRegistrationContactCach;
  ent_cash: null | IRegistrationEntityCash;
}

/* tslint:disable:cyclomatic-complexity */
export const mapRegistrationDataFrom = ({
  contact_addr,
  entity_addr,
  entity_info,
  contact_cash,
  contact_info,
  registration_fee_paid,
  docs,
}: IRegistrationDetails): IRegistrationData => {
  return {
    contacts: {
      nationality: contact_info && contact_info.Nationality || 'Sweden',
      dateOfBirth: contact_info && contact_info.DOB || undefined,
      swedenPersonalId: contact_info && contact_info['National Id No.'] || undefined,
      domincle: entity_addr && entity_addr.Jurisdiction || 'Sweden',
      companyRegistrationNumber: entity_info && entity_info['Organisation Number'] || undefined,
      address: contact_addr && contact_addr['Street Address 1'] || undefined,
      address2: contact_addr && contact_addr['Street Address 2'] || undefined,
      postcode: contact_addr && contact_addr.Postcode || undefined,
      city: contact_addr && contact_addr.City || undefined,
      country: contact_addr && contact_addr.Country || 'Sweden',
      phone: contact_addr && contact_addr['Main Phone'] || undefined,
    },
    polling: {
      isUSTaxResident: contact_cash && contact_cash['Are you a tax resident in the United States'] || undefined,
      isPEP: contact_cash && contact_cash.PEP || undefined,
      fromHighRiskThirdCountry: contact_cash && contact_cash['high risk tax resident'] || undefined,
      occupation: contact_cash && contact_cash.Occupation || undefined,
      fieldOfBusiness: contact_cash && contact_cash['Field of Business'] || undefined,
      originOfFunds: contact_cash && contact_cash['Origin of funds'] || undefined,
      frequencyOfDeposits: contact_cash && contact_cash['Frequency of deposits'] || undefined,
      sizeOfYearlyDeposits: contact_cash && contact_cash['Size of yearly deposits'] || undefined,
      originOfCachDeposits: contact_cash && contact_cash['Origin of cash deposits'] || undefined,
      whatPurposeOfRelationship: contact_cash && contact_cash['What is the purpose of the relationship'] || undefined,
      originBlockchainAssets: contact_cash && contact_cash['Origin of blockchain assets'] || undefined,
      termsAndConditions: contact_cash ? !!contact_cash['Terms and conditions on cash products'] : undefined,
      onboardingInitiativeAgreement: registration_fee_paid,
    },
    files: {
      userIdType: (docs && docs.id_1 && docs.id_1.document_type as onboardingIdType) || undefined,
      proofOfID: docs && docs.id_1 && docs.id_1.file_path && {
        label: docs.id_1.label,
        file: docs.id_1.file_path,
        documentType: docs.id_1.document_type ? docs.id_1.document_type : undefined,
      } || undefined,
      proofOfIDAlt: docs && docs.id_2 && docs.id_2.file_path && {
        label: docs.id_2.label,
        file: docs.id_2.file_path,
      } || undefined,
      proofOfResidency: docs && docs['Proof of Residency'] && docs['Proof of Residency'].file_path && {
        label: docs['Proof of Residency'].label,
        file: docs['Proof of Residency'].file_path || '',
      } || undefined,
    },
    filesInfo: {},
    filesRepresentative: {},
    filesMembers: {
      corporateMembersSecondOmitted: true,
    },
    filesOwners: {},
    payment: {
      isPaidFee: registration_fee_paid,
      orderReference: undefined,
    },
  };
};

export const mapRegistrationDataTo = (
  type: EOnboardingAccountType,
  { contacts, polling, files }: IRegistrationData,
  details: IRegistrationDetails,
): IRegistrationDetailsTo => {
  const isCompany = type === EOnboardingAccountType.corporate;
  const isIndividual = type === EOnboardingAccountType.individual;
  const { docs } = details;

  return {
    docs: !isIndividual ? details.docs : {
      id_1: docs.id_1 && mapDocumentTo(docs.id_1, files.proofOfID, files.userIdType),
      id_2: docs.id_2 && mapDocumentTo(docs.id_2, files.proofOfIDAlt, files.userIdType),
      'Proof of Residency': mapDocumentTo(docs['Proof of Residency'], files.proofOfResidency),
    },
    a_cp: details.cp_info,
    an_entity: details.entity || null,
    ent_info: !isCompany ? details.entity_info : {
      'Organisation Number': contacts.companyRegistrationNumber,
    },
    ent_addr: !isCompany ? details.contact_addr : {
      City: contacts.city,
      Country: contacts.country,
      Jurisdiction: contacts.domincle,
      Postcode: contacts.postcode,
      Phone: contacts.phone,
      'Street Address 1': contacts.address,
      'Street Address 2': contacts.address2,
    },
    con_addr: !isIndividual ? details.contact_addr : {
      'Street Address 1': contacts.address,
      'Street Address 2': contacts.address2,
      City: contacts.city,
      Country: contacts.country,
      Postcode: contacts.postcode,
      'Main Phone': contacts.phone,
    },
    con_info: !isIndividual ? details.contact_info : {
      DOB: mapDateFieldTo(contacts.dateOfBirth),
      Nationality: contacts.nationality,
      'National Id No.': contacts.swedenPersonalId,
    },
    ent_docs: details.doc_ent || null,
    ext_acct: details.account_info || null,
    wallet_acct: details.wallet_info || null,
    acct_addr: details.account_addr || null,
    con_cash: !isIndividual ? details.contact_cash : {
      'Are you a tax resident in the United States': polling.isUSTaxResident,
      PEP: polling.isPEP,
      'high risk tax resident': polling.fromHighRiskThirdCountry,
      Occupation: polling.occupation,
      'Field of Business': polling.fieldOfBusiness,
      'Origin of funds': polling.originOfFunds,
      'Size of yearly deposits': polling.sizeOfYearlyDeposits,
      'Frequency of deposits': polling.frequencyOfDeposits,
      'Origin of cash deposits': polling.originOfCachDeposits,
      'What is the purpose of the relationship': polling.whatPurposeOfRelationship,
      'Origin of blockchain assets': polling.originBlockchainAssets,
      'Terms and conditions on cash products': polling.termsAndConditions ? 'Accepted' : null,
    },
    ent_cash: !isCompany ? details.entity_cash : {
      'Field of Business': polling.fieldOfBusiness,
      'Origin of funds': polling.originOfFunds,
      'Frequency of deposits': polling.frequencyOfDeposits,
      'Size of yearly deposits': polling.sizeOfYearlyDeposits,
      'Origin of cash deposits': polling.originOfCachDeposits,
      'What is the purpose of the relationship': polling.whatPurposeOfRelationship,
      'Origin of blockchain assets': polling.originBlockchainAssets,
      'Terms and conditions on cash products': polling.termsAndConditions ? 'Accepted' : null,
    },
  };
};

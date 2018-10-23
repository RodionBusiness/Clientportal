import { onboardingIdSide, onboardingIdType } from '@onboarding/Docs/enums';
import { OnboardingDocumentRequirementModel as Document } from '@onboarding/Docs/models';

const { passport, driving, identity, taxId, voterId, ukResidence } = onboardingIdType;
const { front, back } = onboardingIdSide;

export const onboardingOnfidoDefaultDocs: Document[] = [
  new Document(),
];

export const onboardingOnfidoDocs: Record<string, Document[]> = {
  Algeria: [
    new Document(passport, front),
    new Document(identity, front, back),
  ],
  'Côte d\'Ivoire': [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front),
  ],
  Egypt: [
    new Document(passport, front),
    new Document(driving, front),
  ],
  Ethiopia: [
    new Document(passport, front),
    new Document(identity, front),
  ],
  Kenya: [
    new Document(passport, front),
    new Document(identity, front, back),
  ],
  Morocco: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  Nigeria: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  'South Africa': [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front),
  ],
  Tanzania: [
    new Document(passport, front),
    new Document(driving, front),
  ],
  Tunisia: [
    new Document(passport, front),
    new Document(driving, front),
  ],
  Uganda: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front),
  ],
  Armenia: [
    new Document(passport, front),
    new Document(driving, front),
  ],
  Azerbaijan: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  Bangladesh: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  'Hong Kong': [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  India: [
    new Document(passport, front),
    new Document(identity, front),
    new Document(taxId, front),
  ],
  Indonesia: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  Jordan: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  Kuwait: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front),
  ],
  Malaysia: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front),
  ],
  Mongolia: [
    new Document(passport, front),
    new Document(driving, front),
  ],
  Oman: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  Pakistan: [
    new Document(passport, front),
    new Document(identity, front, back),
  ],
  Philippines: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
    new Document(voterId, front),
  ],
  Qatar: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front),
  ],
  'Saudi Arabia': [
    new Document(passport, front),
    new Document(driving, front),
  ],
  Singapore: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front),
  ],
  Thailand: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front),
  ],
  Turkey: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  'United Arab Emirates': [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  Vietnam: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front),
  ],
  Albania: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  Austria: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  Belarus: [
    new Document(passport, front),
    new Document(driving, front),
  ],
  Belgium: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  'Bosnia and Herzegovina': [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  Bulgaria: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  Croatia: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  Cyprus: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  'Czech Republic': [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  Denmark: [
    new Document(passport, front),
    new Document(driving, front),
  ],
  Estonia: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  'Faroe Islands': [
    new Document(passport, front),
    new Document(driving, front),
  ],
  Finland: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  France: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front),
  ],
  Georgia: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  Germany: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  Gibraltar: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front),
  ],
  Greece: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  Hungary: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  Iceland: [
    new Document(passport, front),
    new Document(driving, front),
  ],
  Ireland: [
    new Document(passport, front),
    new Document(driving, front),
  ],
  Israel: [
    new Document(passport, front),
    new Document(driving, front),
  ],
  Italy: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  Latvia: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  Liechtenstein: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  Lithuania: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  Luxembourg: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  Macedonia: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  Malta: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  Moldova: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  Monaco: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  Montenegro: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  Netherlands: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  Norway: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  Poland: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  Portugal: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  Romania: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  Russia: [
    new Document(passport, front),
    new Document(driving, front),
  ],
  Serbia: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  Slovakia: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  Slovenia: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  Spain: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  Sweden: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  Switzerland: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  Ukraine: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  'United Kingdom': [
    new Document(passport, front),
    new Document(driving, front),
    new Document(ukResidence, front, back),
  ],
  'The Bahamas': [
    new Document(passport, front),
    new Document(driving, front),
  ],
  Barbados: [
    new Document(passport, front),
    new Document(driving, front),
  ],
  Bermuda: [
    new Document(passport, front),
    new Document(driving, front),
  ],
  Canada: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  'Costa Rica': [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  'Dominican Republic': [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  Greenland: [
    new Document(passport, front),
    new Document(driving, front),
  ],
  Guatemala: [
    new Document(passport, front),
    new Document(driving, front, back),
    new Document(identity, front, back),
  ],
  Jamaica: [
    new Document(passport, front),
    new Document(driving, front),
  ],
  Mexico: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front),
    new Document(voterId, front),
  ],
  'Puerto Rico': [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front),
  ],
  'Trinidad and Tobago': [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  'United States': [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  Australia: [
    new Document(passport, front),
    new Document(driving, front),
  ],
  Fiji: [
    new Document(passport, front),
    new Document(driving, front),
  ],
  'New Zealand': [
    new Document(passport, front),
    new Document(driving, front),
  ],
  Argentina: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front),
  ],
  Bolivia: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front),
  ],
  Brazil: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front),
  ],
  Chile: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front),
  ],
  Colombia: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  Ecuador: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  Paraguay: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front, back),
  ],
  Peru: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front),
  ],
  Uruguay: [
    new Document(passport, front),
    new Document(driving, front),
    new Document(identity, front),
  ],
  Venezuela: [
    new Document(passport, front),
    new Document(identity, front),
  ],
};

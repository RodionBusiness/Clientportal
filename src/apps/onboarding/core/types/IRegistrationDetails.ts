export type TDocFile = {
  'value'?: number;
  '_type'?: 'File';
  'file_path': string | null;
  'document_type': string | null;
  'key'?: string;
  'label': string;
};

export type TDocFiles = {
  [docName: string]: TDocFile;
};

export type TCurrency = {
  'currency': null;
  '_type': string;
  // tslint:disable-next-line no-reserved-keywords
  'type': string;
  'value': number;
  'label': string;
};

export type TPaymentCode = {
  '_type': string;
  'value': number;
  'label': string;
} | {
  '_type': string;
  'value': null;
  'label': null;
};

export interface IRegistrationContactInfo {
  'DOB'?: string | null;
  'Nationality'?: string | null;
  'National Id No.'?: string | null;
}

export interface IRegistrationWalletInfo {
  'name'?: string | null;
  'account_no'?: null;
}

export interface IRegistrationContactCach {
  'Field of Business'?: string | null;
  'Are you a tax resident in the United States'?: string | null;
  'Occupation'?: string | null;
  'Origin of cash deposits'?: string | null;
  'PEP'?: string | null;
  'Size of yearly deposits'?: string | null;
  'Origin of funds'?: string | null;
  'Terms and conditions on cash products'?: string | null;
  'Origin of blockchain assets'?: string | null;
  'What is the purpose of the relationship'?: string | null;
  'Frequency of deposits'?: string | null;
  'high risk tax resident'?: string | null;
}

export interface IRegistrationEntityCash {
  'Field of Business'?: string | null;
  'Origin of cash deposits'?: string | null;
  'Size of yearly deposits'?: string | null;
  'Origin of funds'?: string | null;
  'Terms and conditions on cash products'?: string | null;
  'Origin of blockchain assets'?: string | null;
  'What is the purpose of the relationship'?: string | null;
  'Frequency of deposits'?: string | null;
}

export interface IRegistrationEntityInfo {
  'Organisation Number'?: null | string;
  'Source of Funds'?: null | string;
  'Registered Country'?: null | string;
  'Registered State'?: null | string;
  'Registered City'?: null | string;
  'Registered Postcode'?: null | string;
  'Registered Address 1'?: null | string;
  'Registered Address 2'?: null | string;
  'Legal representative'?: null | string;
  'Stockholder'?: null | string;
  'Main Phone'?: null | string;
  'Reports Email'?: null | string;
  'Type of Business'?: null | string;
}

export interface IRegistrationEntity {
  'base_currency_id'?: number;
  'base_currency'?: TCurrency;
  'name'?: null;
}

export interface IRegistrationContactAddr {
  'City'?: null | string;
  'Country'?: null | string;
  'Street Address 1'?: null | string;
  'Street Address 2'?: null | string;
  'Postcode'?: null | string;
  'Main Phone'?: null | string;
}

export interface IRegistrationClientPersonInfo {
  'lastname'?: string;
  'email'?: string;
  'firstname'?: string;
}

export interface IRegistrationAccountInfo {
  'name'?: string | null;
  'bank_id'?: number | null;
  'payment_code_one'?: TPaymentCode;
  'payment_code_two_ref'?: null;
  'payment_code_two_id'?: number | null;
  'payment_code_one_ref'?: null;
  'payment_code_one_id'?: number | null;
  'payment_code_two'?: TPaymentCode;
  'bank'?: TPaymentCode;
  'account_no'?: string | null;
}

export interface IRegistrationAccountAddr {
  'addrPostCode'?: string | null;
  'accountCountry'?: string | null;
  'SCC'?: string | null;
  'B2B'?: string | null;
  'SDD'?: string | null;
  'addrLine1'?: string | null;
  'addrLine2'?: string | null;
  'addrState'?: string | null;
  'Branch'?: string | null;
  'SCT'?: string | null;
  'addrCity'?: string | null;
  'accountCountryISO'?: string | null;
  'COR1'?: string | null;
}

export interface IRegistrationEntityAddr {
  'Website'?: string | null;
  'City'?: string | null;
  'Fax'?: string | null;
  'Country'?: string | null;
  'Jurisdiction'?: string | null;
  'Registered Address'?: string | null;
  'Street Address 1'?: string | null;
  'Phone'?: string | null;
  'State'?: string | null;
  'Street Address 2'?: string | null;
  'Postcode'?: string | null;
  'Alt Phone'?: string | null;
  'Reports Email'?: string | null;
  'Email'?: string | null;
  'Postal Address'?: string | null;
}

export interface IRegistrationDetails {
  'submitted': boolean;
  'registration_fee_paid': boolean;
  'account_info': IRegistrationAccountInfo;
  'account_addr': IRegistrationAccountAddr;
  'contact_info': IRegistrationContactInfo;
  'contact_cash': null | IRegistrationContactCach;
  'contact_addr': IRegistrationContactAddr;
  'cp_info': IRegistrationClientPersonInfo;
  'docs': TDocFiles;
  'entity_info': null | IRegistrationEntityInfo;
  'entity': null | IRegistrationEntity;
  'entity_addr': null | IRegistrationEntityAddr;
  'entity_cash': null | IRegistrationEntityCash;
  'doc_ent': TDocFiles;
  'wallet_info': IRegistrationWalletInfo;
}

export interface IRegistrationNewDocumentPayload {
  'filename': string;
  'is_personal': boolean;
}

export interface IRegistrationNewDocumentsPayload {
  'file_details': IRegistrationNewDocumentPayload[];
}

import { IDocument } from '@common/core/types';

export enum TBankAccountType {
  swift = '3',
  iban = '2',
}

export type IBankAccountInfo = {
  ibanBicSwift: string;
  accountType: TBankAccountType;
  accountDescription: string;
  accountNumber: string;
  accountName: string;
};

export type TBankInfo = {
  accountNumber: string;
  bankId: number;
  name: string;
  city: string;
  zip: string;
  address1: string;
  address2: string;
  bic: string;
  branch: string;
  state: string;
  country: string;
  countryISO: string;
  iban?: string;
  B2B: string;
  COR1: string;
  SCC: string;
  SCT: string;
  SDD: string;
};

interface IError {
  message: string;
}

export interface IBankServiceGetBankInfoData {
  bank_data: {
    account: string,
    address: string,
    bic: string,
    branch: string,
    city: string,
    country: string,
    state: string,
    zip: string,
    country_iso: string,
  };
  bank_surrogate: {
    label: string,
    value: number,
  };
  sepa_data: {
    B2B: string,
    COR1: string,
    SCC: string,
    SCT: string,
    SDD: string,
  };
  errors?: IError[];
}

export const bankAccountMapFrom = (data: IBankServiceGetBankInfoData): TBankInfo => {
  return {
    bic: data.bank_data.bic,
    accountNumber: data.bank_data.account,
    bankId: data.bank_surrogate.value,
    name: data.bank_surrogate.label,
    address1: data.bank_data.address,
    address2: '',
    city: data.bank_data.city,
    zip: data.bank_data.zip,
    branch: data.bank_data.branch,
    state: data.bank_data.state,
    country: data.bank_data.country,
    countryISO: data.bank_data.country_iso,
    B2B: data.sepa_data.B2B,
    COR1: data.sepa_data.COR1,
    SCC: data.sepa_data.SCC,
    SCT: data.sepa_data.SCT,
    SDD: data.sepa_data.SDD,
  };
};

interface IBankAccountServiceAddData {
  ext_acct: {
    name: string;                 // External Account Name
    bank_account_name: string;    // Internal Account Name
    bank_id: number | null;              // bank_surrogate value
    payment_code_two_ref: string | null; // Bic for Iban account type
    payment_code_two_id: number | null;  // 11 for Iban
    payment_code_one_ref: string; // Iban for Iban
    payment_code_one_id: number;  // AccountType
    account_no: string;
    id: null;
  };
  acct_addr: {
    addrPostCode: string | null;   // "1082 PP",
    accountCountry: string | null; // "Netherlands",
    SCC: string | null;
    B2B: string | null;
    SDD: string | null;
    SCT: string | null;
    COR1: string | null;
    addrLine1: string | null;      // "GUSTAV MAHLERLAAN 10",
    addrLine2: string | null;
    addrState: string | null;
    Branch: string | null;
    addrCity: string | null;       // "AMESTERDAM",
    accountCountryISO: string | null,
  };
  a_type: boolean;          // false for bank account
  docs: {
    proof_owner: {
      file_path: string;
      key: string;          // "proof_owner",
      label: string;
    };
  };
}

export const bankAccountMapTo = (
  accountInfo: IBankAccountInfo,
  proofDoc: IDocument,
  bankInfo: TBankInfo | null,
): IBankAccountServiceAddData => {
  const ext_acct = {
    id: null,
    name: accountInfo.accountDescription,
    bank_account_name: accountInfo.accountName,
    bank_id: bankInfo ? bankInfo.bankId : null,     // bank_surrogate value
    payment_code_two_ref: bankInfo ? bankInfo.bic : null, // Bic for Iban account type
    payment_code_two_id: bankInfo ? 11 : null,  // 11 for Iban
    payment_code_one_ref: accountInfo.ibanBicSwift, // Iban for Iban
    payment_code_one_id: parseFloat(accountInfo.accountType),  // AccountType
    account_no: accountInfo.accountNumber,
  };

  const acct_addr = bankInfo ? {
    addrPostCode: bankInfo.zip,   // "1082 PP",
    accountCountry: bankInfo.country, // "Netherlands",
    SCC: bankInfo.SCC,
    B2B: bankInfo.B2B,
    SDD: bankInfo.SDD,
    SCT: bankInfo.SCT,
    COR1: bankInfo.COR1,
    addrLine1: bankInfo.address1,      // "GUSTAV MAHLERLAAN 10",
    addrLine2: bankInfo.address2,
    addrState: bankInfo.state,
    Branch: bankInfo.branch,
    addrCity: bankInfo.city,       // "AMESTERDAM",
    accountCountryISO: bankInfo.countryISO,
  } : {
    addrPostCode: null,   // "1082 PP",
    accountCountry: null, // "Netherlands",
    SCC: null,
    B2B: null,
    SDD: null,
    SCT: null,
    COR1: null,
    addrLine1: null,      // "GUSTAV MAHLERLAAN 10",
    addrLine2: null,
    addrState: null,
    Branch: null,
    addrCity: null,       // "AMESTERDAM",
    accountCountryISO: null,
  };

  const docs = {
    proof_owner: {
      file_path: proofDoc.file,
      key: 'proof_owner',          // "proof_owner",
      label: proofDoc.label,
    },
  };

  return {
    ext_acct,
    acct_addr,
    docs,
    a_type: false,          // false for bank account
  };
};

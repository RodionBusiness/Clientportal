const DEPOSIT_ACCOUNT_BIC_SWIFT = String(process.env.DEPOSIT_ACCOUNT_BIC_SWIFT);

export type TClearingAccount = {
  entityPostCode: string;
  bankName: string;
  bankCountry: string;
  entityName: string;
  bankAddress: string;
  entityAddress: string;
  bankCity: string;
  value: string;
  bic: string;
  accountNo: string;
  iban: string;
  entityCountry: string;
  entityCity: string;
  label: string;
  paymentBicSwift: string;
  bankPostCode: string;
  bankBicSwift: string;
};

type TClearingAccountData = {
  entity_post_code: string;
  bank_name: string;
  bank_country: string;
  entity_name: string;
  bank_address: string;
  entity_address: string;
  bank_city: string;
  value: string;
  bic: string;
  account_no: string;
  iban: string;
  entity_country: string;
  entity_city: string;
  label: string;
  bank_post_code: string;
};

export const clearingAccountCollectionItemMapFrom = (data: TClearingAccountData): TClearingAccount => {
  return {
    entityPostCode: data.entity_post_code,
    bankName: data.bank_name,
    bankCountry: data.bank_country,
    entityName: data.entity_name,
    bankAddress: data.bank_address,
    entityAddress: data.entity_address,
    bankCity: data.bank_city,
    value: data.value,
    bic: data.bic,
    accountNo: data.account_no,
    iban: data.iban,
    entityCountry: data.entity_country,
    entityCity: data.entity_city,
    label: data.label,
    bankPostCode: data.bank_post_code,
    bankBicSwift: DEPOSIT_ACCOUNT_BIC_SWIFT,
    paymentBicSwift: DEPOSIT_ACCOUNT_BIC_SWIFT,
  };
};

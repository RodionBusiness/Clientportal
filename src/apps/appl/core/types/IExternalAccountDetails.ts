import { IDataValue, TYesNo } from '@appl/core/types';

export interface IExternalAccountDetails {
  account_info: {
    id: number;
    name: string;
    bank: IDataValue;
    bank_id: number;
    bank_account_name?: string;
    account_no: string;
    payment_code_one: IDataValue;
    payment_code_two_ref: string;
    payment_code_two_id: number;
    payment_code_one_ref: string;
    payment_code_one_id: number;
    payment_code_two: IDataValue;
  };
  acct_type: boolean;
  error?: any;
  account_addr: {
    addrPostCode: string;
    accountCountry: string;
    SCC: TYesNo;
    B2B: TYesNo;
    SDD: TYesNo;
    addrLine1: string;
    addrLine2?: string;
    addrState?: string;
    Branch?: string;
    SCT: TYesNo;
    addrCity: string;
    accountCountryISO?: string;
    COR1: TYesNo;
  };
  docs: {};
}

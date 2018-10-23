import { TExternalAccount, TExternalAccountData } from '@appl/components/ApplWithdraw';

export interface IExternalAccountCollectionData {
  items: TExternalAccountData[];
}

export const tradingAccountCollectionItemMapFrom = (data: TExternalAccountData): TExternalAccount => {
  return {
    bankName: data.bank_name,
    label: data.label,
    accountType: data.account_type,
    value: parseFloat(data.value),
    displayLabel: data.bank_name ? `${data.label} (${data.bank_name})` : `${data.label}`,
    accountNo: String(data.account_no),
  };
};

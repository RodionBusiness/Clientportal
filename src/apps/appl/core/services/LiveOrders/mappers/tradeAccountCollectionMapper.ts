export type TTradingAccount = {
  value: number | null;
  ccy: string;
  ccyId: number;
  accountId: number;
  accountType: string;
};

export type TTradingAccountData = {
  account?: {
    value: number,
    label: string,
  };
  ccy: string;
  currency_id: number;
  account_id: number;
  account_type: string;
};

export const tradingAccountCollectionItemMapFrom = (data: TTradingAccountData): TTradingAccount => {
  return {
    value: (data.account) ? data.account.value : null,
    ccy: data.ccy,
    ccyId: data.currency_id,
    accountId: data.account_id,
    accountType: data.account_type,
  };
};

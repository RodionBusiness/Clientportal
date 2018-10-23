import { TTradingAccountData } from '@appl/core/services/LiveOrders';

export type TRunningAccount = {
  label: string,
  value: string,
};

export const runningAccountCollectionMapFrom = (data: TTradingAccountData[]): TRunningAccount[] => {
  if (!data) {
    return [];
  }

  const accounts: TRunningAccount[] = [];
  const uniqueIds: number[] = [];

  data.forEach((item) => {
    if (item.account && uniqueIds.indexOf(item.account.value) === -1) {
      uniqueIds.push(item.account.value);
      accounts.push({
        value: item.account.value ? item.account.value.toString() : '',
        label: item.account.label,
      });
    }
  });

  return accounts;
};

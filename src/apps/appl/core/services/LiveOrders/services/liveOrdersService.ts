import {
  clearingAccountCollectionItemMapFrom,
  runningAccountCollectionMapFrom,
  TClearingAccount,
  tradingAccountCollectionItemMapFrom,
  TRunningAccount,
  TTradingAccount,
} from '@appl/core/services/LiveOrders';
import { BSWebSocket } from '@common/core/services';

interface ILiveOrdersResponse {
  items: any[];
  clearing_account: any;
}

export interface ILiveOrders {
  tradingAccounts: TTradingAccount[];
  clearingAccount: TClearingAccount | null;
  runningAccounts: TRunningAccount[];
}

export async function liveOrdersServiceFetchAll(): Promise<ILiveOrders> {
  const { items, clearing_account } = await BSWebSocket.invoke<ILiveOrdersResponse>(
    'client_control',
    'get_admin_live_orders',
    {},
  );

  const rawData = items || [];
  const tradingAccounts: TTradingAccount[] = rawData.map(tradingAccountCollectionItemMapFrom);
  const clearingAccount: TClearingAccount = clearingAccountCollectionItemMapFrom(clearing_account);
  const runningAccounts: TRunningAccount[] = runningAccountCollectionMapFrom(rawData);

  return { tradingAccounts, clearingAccount, runningAccounts };
}

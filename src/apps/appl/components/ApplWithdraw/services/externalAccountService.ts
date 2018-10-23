import {
  IExternalAccountCollectionData,
  isNotBlankAccount,
  TExternalAccount,
  tradingAccountCollectionItemMapFrom,
} from '@appl/components/ApplWithdraw';
import { BSWebSocket } from '@common/core/services';

// tslint:disable-next-line:export-name
export async function externalAccountServiceFetchAll(): Promise<TExternalAccount[]> {
  const data = await BSWebSocket.invoke<IExternalAccountCollectionData>(
    'client_control',
    'get_one_off_settle_account_dets',
    {},
  );

  if (!data.items) {
    return [];
  }

  return data.items
    .map(tradingAccountCollectionItemMapFrom)
    .filter(isNotBlankAccount);
}

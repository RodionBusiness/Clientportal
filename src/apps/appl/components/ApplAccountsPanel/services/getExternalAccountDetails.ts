import { IExternalAccountDetails } from '@appl/core/types';
import { BSWebSocket } from '@common/core/services';

export const getExternalAccountDetails = (
  accountId: string | number,
  accountType: string,
): Promise<IExternalAccountDetails> =>
  BSWebSocket.invoke<IExternalAccountDetails>(
    'client_control',
    'get_external_account_detail',
    {
      account_id: accountId,
      a_type: accountType,
    },
  );

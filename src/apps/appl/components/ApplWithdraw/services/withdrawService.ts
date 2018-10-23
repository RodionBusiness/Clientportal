import {
  IWithdrawCollectionData,
  IWithdrawModel,
  TWithdrawCollection,
  withdrawCollectionMapFrom,
  withdrawMapTo,
} from '@appl/components/ApplWithdraw/mappers';
import { orderingToArray } from '@common/core/helpers';
import { BSWebSocket } from '@common/core/services';

interface IAddWithdrawResponse {
  item?: any;
  error?: string;
}

export async function withdrawServiceAdd(model: IWithdrawModel): Promise<void> {
  const data = withdrawMapTo(model);

  const { error } = await BSWebSocket.invoke<IAddWithdrawResponse>(
    'client_registration_service',
    'admin_save_account_transfer',
    data,
  );

  if (error) {
    throw new Error(error);
  }
}

export async function withdrawServiceFetchAll(collection: TWithdrawCollection): Promise<TWithdrawCollection> {
  const { limit, page } = collection.pagination;
  const offset = (page - 1) * limit;
  const ordering = orderingToArray(collection.ordering);

  const result = await BSWebSocket.invoke<IWithdrawCollectionData>(
    'client_registration_service',
    'load_cash_transfer_requests',
    {
      limit,
      offset,
      criteria: {
        order_by: ordering,
        request_type: 'Withdraw',
      },
    },
  );

  return withdrawCollectionMapFrom(collection, result);
}

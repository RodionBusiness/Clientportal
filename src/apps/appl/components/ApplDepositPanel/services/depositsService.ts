import {
  depositCollectionMapFrom,
  depositMapFrom,
  depositMapTo,
  IDepositCollectionData,
  IDepositModel,
  TDepositCollection
} from '@appl/components/ApplDepositPanel';
import { orderingToArray } from '@common/core/helpers';
import { BSWebSocket } from '@common/core/services';

interface IAddDepositResponse {
  item?: any;
  error?: string;
}

export async function depositsServiceAdd(model: IDepositModel): Promise<IDepositModel> {
  const data = depositMapTo(model);

  const { item, error } = await BSWebSocket.invoke<IAddDepositResponse>(
    'client_registration_service',
    'admin_save_account_transfer',
    data
  );

  if (error) {
    throw new Error(error);
  }

  return depositMapFrom(model, item);
}

export async function depositsServiceFetchAll(
  collection: TDepositCollection
): Promise<TDepositCollection> {
  const { limit, page } = collection.pagination;
  const offset = (page - 1) * limit;
  const ordering = orderingToArray(collection.ordering);

  const result = await BSWebSocket.invoke<IDepositCollectionData>(
    'client_registration_service',
    'load_cash_transfer_requests',
    {
      limit,
      offset,
      criteria: {
        order_by: ordering,
        request_type: 'Deposit'
      }
    }
  );

  return depositCollectionMapFrom(collection, result);
}


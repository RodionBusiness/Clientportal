import { createPagination } from '@common/core/helpers/TransportHelpers';
import {
  ICollection,
  ICollectionWithOrdering,
  ICollectionWithPagination,
  ITableData,
} from '@common/core/types';

interface IWithdrawCollectionItemData {
  sourced: string;
  request_status: string;
  from_account: string;
  to_account: string;
  to_amount: number;
  to_ccy: string;
  depo_id_wired: string;
}

export interface IWithdrawCollectionItemModel {
  sourced: string;
  status: string;
  fromAccount: string;
  toAccount: string;
  amount: number;
  currency: string;
  refID: string;
}

export interface IWithdrawCollectionData {
  count: number;
  items: ITableData<IWithdrawCollectionItemData>;
}

export type TWithdrawCollection = ICollection<IWithdrawCollectionItemModel[]>
  & ICollectionWithOrdering & ICollectionWithPagination;

const withdrawCollectionItemMapFrom = (
  data: IWithdrawCollectionItemData,
): IWithdrawCollectionItemModel => {
  return {
    sourced: data.sourced,
    status: data.request_status,
    fromAccount: data.from_account,
    toAccount: data.to_account,
    amount: data.to_amount,
    currency: data.to_ccy,
    refID: data.depo_id_wired,
  };
};

export const withdrawCollectionMapFrom = (
  collection: TWithdrawCollection,
  data: IWithdrawCollectionData,
): TWithdrawCollection => {
  const { limit, page } = collection.pagination;

  const pagination = createPagination(limit, page, data.count);
  const items = data.items.map(withdrawCollectionItemMapFrom);

  return {
    ...collection,
    pagination,
    items,
  };
};

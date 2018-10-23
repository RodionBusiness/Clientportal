import { createPagination } from '@common/core/helpers';
import { ICollection, ICollectionWithOrdering, ICollectionWithPagination, ITableData } from '@common/core/types';

interface IDepositCollectionItemData {
  sourced: string;
  depo_id_wired: string;
  request_status: string;
  from_account: string;
  to_amount: number;
  to_ccy: string;
}

export interface IDepositCollectionItemModel {
  sourced: string;
  refID: string;
  status: string;
  fromAccount: string;
  amount: number;
  currency: string;
}

export interface IDepositCollectionData<Item = any> {
  count: number;
  items: ITableData<Item>;
}

export type TDepositCollection = ICollection<IDepositCollectionItemModel[]>
  & ICollectionWithOrdering & ICollectionWithPagination;

const depositCollectionItemMapFrom = (data: IDepositCollectionItemData): IDepositCollectionItemModel => {
  return {
    sourced: data.sourced,
    refID: data.depo_id_wired,
    status: data.request_status,
    fromAccount: data.from_account,
    amount: data.to_amount,
    currency: data.to_ccy,
  };
};

export const depositCollectionMapFrom = (collection: TDepositCollection, data: IDepositCollectionData)
  : TDepositCollection => {
  const { limit, page } = collection.pagination;

  const pagination = createPagination(limit, page, data.count);
  const items = data.items.map(depositCollectionItemMapFrom);

  return {
    ...collection,
    pagination,
    items,
  };
};

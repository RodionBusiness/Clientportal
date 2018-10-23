import * as moment from 'moment';

import {
  balanceHistoryCollectionMapFrom,
  IBalanceHistoryCollectionItemData,
  IBalanceHistoryCollectionItemModel,
} from '@appl/components/ApplBalances';
import { IDepositCollectionData } from '@appl/components/ApplDepositPanel';
import { BSWebSocket } from '@common/core/services';

export interface IBalanceHistoryServiceFetchAllResponse {
  items: IBalanceHistoryCollectionItemData[];
}

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

// tslint:disable-next-line:export-name
export async function balanceHistoryServiceFetchAll(accountId: string, fromDate: string, toDate: string)
  : Promise<IBalanceHistoryCollectionItemModel[]> {

  const { items } = await BSWebSocket.invoke<IDepositCollectionData<IBalanceHistoryCollectionItemData>>(
    'client_control',
    'get_dashboard_account_running_balances',
    {
      account_id: parseFloat(accountId),
      from_date: moment(fromDate).format(DATE_FORMAT),
      to_date: moment(toDate).format(DATE_FORMAT),
    },
  );

  return items ? items.map(balanceHistoryCollectionMapFrom) : [];
}

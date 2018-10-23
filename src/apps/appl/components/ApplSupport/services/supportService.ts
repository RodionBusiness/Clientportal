import moment from 'moment';

import {
  ISupportCollectionData,
  ISupportCollectionItemUpdateModel,
  supportCollectionMapFrom,
  TSupportCollection,
} from '@appl/components/ApplSupport';
import {
  INewSupportMessage,
  supportMapperMapTo,
  supportUpdateMapperMapTo,
} from '@appl/components/ApplSupport/mappers/supportMapper';
import { IUserState } from '@appl/core/types';
import { BSWebSocket } from '@common/core/services';

export async function supportServiceAdd(
  user: IUserState,
  data: INewSupportMessage,
): Promise<string> {
  return BSWebSocket.invoke<string>(
    'client_registration_service',
    'set_feedback',
    supportMapperMapTo(user, data),
  );
}

export async function supportServiceUpdate(
  response: ISupportCollectionItemUpdateModel,
): Promise<void> {
  return BSWebSocket.invoke<any>(
    'client_registration_service',
    'update_issue_feedback',
    supportUpdateMapperMapTo(response),
  );
}

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

export async function supportServiceFetchAll(
  collection: TSupportCollection,
): Promise<TSupportCollection> {
  const { limit, page } = collection.pagination;
  const offset = (page - 1) * limit;

  const dateFrom = moment().add(-1, 'year').startOf('day').format(DATE_FORMAT);
  const dateTo = moment().endOf('day').format(DATE_FORMAT);

  const result = await BSWebSocket.invoke<ISupportCollectionData>(
    'client_control',
    'get_support_query_response',
    {
      limit,
      offset,
      from_date: dateFrom,
      to_date: dateTo,
      criteria: {},
      item: {},
      trade_date: null,
    },
  );

  return supportCollectionMapFrom(collection, result);
}

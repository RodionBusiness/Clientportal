import { applPrincipalQtyMapper } from '@appl/components/Appl/mappers';
import { TCurrency } from '@appl/core/types';
import { BSWebSocket } from '@common/core/services';

export interface ICurrency {
  currency_id: number;
  currency: string;
}

export const applPrincipalQtyService = {

  async getClientFeeCurrencies(): Promise<TCurrency[]> {
    return applPrincipalQtyMapper.mapFrom(await BSWebSocket.invoke<ICurrency[]>(
      'client_control',
      'get_client_fee_history_currencies',
    ));
  },

};

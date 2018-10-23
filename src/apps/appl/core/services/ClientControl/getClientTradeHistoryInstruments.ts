import { TInstrumentsList } from '@appl/core/types';
import { BSWebSocket } from '@common/core/services';

export const getClientTradeHistoryInstruments = async (): Promise<TInstrumentsList> => {
  const list = await BSWebSocket.invoke<TInstrumentsList> (
    'client_control',
    'get_client_trade_history_instruments',
  );

  return list || [];
};

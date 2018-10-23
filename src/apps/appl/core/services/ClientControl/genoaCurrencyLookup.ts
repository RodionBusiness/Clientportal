import { TCurrencies } from '@appl/core/types';
import { BSWebSocket } from '@common/core/services';

type IGenoaCurrencyLookupRequest = {
  criteria: object;
  filter: string;
  limit: number;
  model: 'Instrument';
};

export const genoaCurrencyLookup = async (filter: string): Promise<TCurrencies> => {
  const kwargs: IGenoaCurrencyLookupRequest = {
    filter,
    criteria: {},
    limit: 7,
    model: 'Instrument',
  };

  const result = await BSWebSocket.invoke<TCurrencies>(
    'client_control',
    'genoa_currency_lookup',
    kwargs,
  );

  return result || [];
};

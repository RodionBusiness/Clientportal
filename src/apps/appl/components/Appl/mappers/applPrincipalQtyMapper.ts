import { TCurrency } from '@appl/core/types';

export const applPrincipalQtyMapper = {

  mapFrom(data: any): TCurrency[] {
    if (!Array.isArray(data)) {
      return [];
    }

    return data.map((item: any) => ({
      _type: '',
      label: `${item.currency}`,
      value: item.currency_id,
    }));
  },

};

import { TCurrency } from '@appl/core/types';
import { TOption } from '@common/components';

export const applOptionMapper = {

  mapFromCurrency({ label, value }: TCurrency): TOption {
    return { label, value: String(value) };
  },

};

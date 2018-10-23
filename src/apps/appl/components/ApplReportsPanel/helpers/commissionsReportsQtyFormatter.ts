import { CurrencyFormatter, fixNumberValue } from '@common/core/helpers';
import { TTableCustomFormatter } from '@common/core/types';

export const commissionsReportsQtyFormatter: TTableCustomFormatter = (value, { fieldName }, row) => {
  if (row.trade_type === 'ExchangeTrade') {
    if (fieldName === 'trade_price') {
      return CurrencyFormatter.format(fixNumberValue(value), { precision: 6 });
    }

    return value
      .split(/\s+/)
      .map(val =>
        isNaN(Number(val)) ?
          val :
          CurrencyFormatter.format(
            fixNumberValue(val),
            { precision: fieldName === 'ass_ccy' ? 0 : 6 },
          ),
      )
      .join(' ');
  } else if (row.trade_type === 'FXTrade') {
    if (fieldName === 'trade_price') {
      return CurrencyFormatter.format(fixNumberValue(value), { precision: 2 });
    }

    return value
      .split(/\s+/)
      .map((val, __, vals) =>
        isNaN(Number(val)) ?
          val :
          (vals[ 0 ] === 'XBT' ?
            CurrencyFormatter.format(fixNumberValue(val), { precision: 8 }) :
            CurrencyFormatter.format(fixNumberValue(val), { precision: 2 })
          ),
      )
      .join(' ');
  }

  return value;
};

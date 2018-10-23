import { CurrencyFormatter, fixNumberValue } from '@common/core/helpers';
import { TTableCustomFormatter } from '@common/core/types';

const XBT_RE = /^XBT$/i;

export const cashBalancesReportAmountFormatter: TTableCustomFormatter = (val, _, row) => {
  if (row.ccy && XBT_RE.test(row.ccy)) {
    return CurrencyFormatter.format(fixNumberValue(val), { precision: 8 });
  }

  return CurrencyFormatter.format(fixNumberValue(val), { precision: 2 });
};

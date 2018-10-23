import { ITableFieldMetaData } from '@common/core/types';

import { cashBalancesReportAmountFormatter } from '@appl/components/ApplReportsPanel';

interface IPickedFields {
  amount?: ITableFieldMetaData;
}

export const addCashBalancesReportFormatters = (fields: ITableFieldMetaData[]) => {
  const { amount } = fields.reduce<IPickedFields>(
    (map, field) => {
      switch (field.fieldName) {
        case 'amount': return {
          ...map,
          [ field.fieldName ]: field,
        };
        default: return map;
      }
    },
    {},
  );

  if (amount) {
    amount.formatter = cashBalancesReportAmountFormatter;
  }
};

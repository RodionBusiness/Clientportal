import { ITableFieldMetaData } from '@common/core/types';

import { commissionsReportsQtyFormatter } from '@appl/components/ApplReportsPanel';

interface IPickedFields {
  ass_ccy?: ITableFieldMetaData;
  trade_price?: ITableFieldMetaData;
  num_ccy?: ITableFieldMetaData;
}

export const addCommissionsReportsFormatters = (fields: ITableFieldMetaData[]) => {
  const { ass_ccy, num_ccy, trade_price } = fields.reduce<IPickedFields>(
    (map, field) => {
      switch (field.fieldName) {
        case 'ass_ccy':
        case 'trade_price':
        case 'num_ccy': return {
          ...map,
          [ field.fieldName ]: field,
        };
        default: return map;
      }
    },
    {},
  );

  if (ass_ccy) {
    ass_ccy.formatter = commissionsReportsQtyFormatter;
  }

  if (num_ccy) {
    num_ccy.formatter = commissionsReportsQtyFormatter;
  }

  if (trade_price) {
    trade_price.formatter = commissionsReportsQtyFormatter;
  }
};

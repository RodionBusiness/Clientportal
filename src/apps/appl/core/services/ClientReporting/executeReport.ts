import * as moment from 'moment';

import { mapColToField } from '@appl/core/mappers';
import { EReportType, IReportResponse } from '@appl/core/types';
import { BSWebSocket } from '@common/core/services';
import { ITableFieldMetaData } from '@common/core/types';

export interface IExecuteReportOptions {
  reportName: string;
  tradeType?: string;
  currencyID?: string;
  principalQty?: string;
  feeOnly?: boolean;
  search?: string;
  dateFrom: string;
  dateTo: string;
}

const SENDING_DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

interface IExecuteReportResponse extends IReportResponse {
  fields: ITableFieldMetaData[];
}

export const executeReport = async (params: IExecuteReportOptions): Promise<IExecuteReportResponse> => {
  const kwargs = {
    trade_type: params.tradeType || null,
    currency_id: params.reportName === EReportType.commitionReport
      ? params.principalQty || null
      : params.currencyID || null,
    report_name: params.reportName,
    fee_only: params.feeOnly || null,
    search: params.search || null,
    from_date: moment(params.dateFrom).format(SENDING_DATE_FORMAT),
    to_date: moment(params.dateTo).format(SENDING_DATE_FORMAT),
  };

  const { columns, data, title, error } = await BSWebSocket.invoke<IReportResponse>(
    'client_reporting',
    'execute_report',
    kwargs,
  );

  if (error) {
    throw new Error(error);
  }

  const fields = columns.map(mapColToField);

  return {
    columns,
    fields,
    data,
    title,
  };
};

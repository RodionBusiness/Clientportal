import * as moment from 'moment';

import { TReportColumns } from '@appl/core/types';
import { BSWebSocket, getRandomHashString } from '@common/core/services';
import { ITableData } from '@common/core/types';

interface ISaveReportParams {
  cols: TReportColumns;
  rows: ITableData;
  reportType: string;
  fileType: string;
  dateFrom?: string;
  dateTo?: string;
}

const REPORT_DATE_FORMAT = 'YYYY-MM-DD';

export const saveReport = async ({
  rows,
  cols,
  fileType,
  reportType,
  dateFrom,
  dateTo,
}: ISaveReportParams): Promise<string> => {
  const currentDate = moment().format(REPORT_DATE_FORMAT);

  const data = {
    rows,
    cols: cols.map(({ col }) => col),
  };

  const reportDate = dateFrom && dateTo ?
  `${moment(dateFrom).format(REPORT_DATE_FORMAT)}_-_${moment(dateTo).format(REPORT_DATE_FORMAT)}` :
  currentDate;

  const filebasename = generateFileName(reportType, reportDate);

  // tslint:disable-next-line no-return-await
  return await BSWebSocket.invoke<string>(
    'client_reporting',
    'save_report_to_archive',
    {
      data,
      name: `${filebasename}.${fileType}`,
      source: filebasename,
      file_format: fileType,
      report_date: currentDate,
      the_html: null,
    },
  );
};

const generateFileName = (tableType: string, date: string) =>
  `${tableType}_${date}_${getRandomHashString()}`;

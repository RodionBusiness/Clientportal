import { ITableData, TRawColumn } from '@common/core/types';

export enum EReportType {
  commitionReport = 'commission_report',
  cachBalances = 'cash_balances',
}

export interface IExecuteReportOptions {
  report_name: EReportType.cachBalances | EReportType.commitionReport;
  currency_id: string | null;
  from_date: string;
  to_date: string;
}

export type TReportColumn = TRawColumn;

export type TReportColumns = TReportColumn[];

export interface IReportResponse {
  columns: TReportColumns;
  data: ITableData;
  title: string;
  error?: string;
}

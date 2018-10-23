import * as React from 'react';
import { connect } from 'react-redux';

import { EReportType, TReportColumns } from '@appl/core/types';
import { ITableData, ITableFieldMetaData } from '@common/core/types';

import {
  addCashBalancesReportFormatters,
  addCommissionsReportsFormatters,
  ApplReportsPanelContainer,
  IBSReportsSearchFormValues,
} from '@appl/components/ApplReportsPanel';
import { executeReport, IExecuteReportOptions } from '@appl/core/services/ClientReporting';
import { IDispatchNotifyActionsProps, mapDispatchNotifyActions } from '@common/core/connectors';

interface IApplReportsPanelState {
  data: ITableData;
  columns: TReportColumns;
  fields: ITableFieldMetaData[];
  sending: boolean;
  sortBy?: string;
}

export class ApplReportsPanelComponent extends
  React.Component<IDispatchNotifyActionsProps, IApplReportsPanelState> {

  public state: IApplReportsPanelState = {
    data: [],
    columns: [],
    fields: [],
    sending: false,
  };

  public render() {
    const { data, fields, sending, columns, sortBy } = this.state;

    return (
      <ApplReportsPanelContainer
        data={data}
        fields={fields}
        sending={sending}
        columns={columns}
        onSearchSubmit={this.getReport}
        sortBy={sortBy}
        sortAsc={true}
      />
    );
  }

  private getReport = async (values: IBSReportsSearchFormValues) => {
    this.setState({ sending: true });

    try {
      const { reportName } = values;
      const { columns, fields, data } = await executeReport(values as IExecuteReportOptions);

      if (reportName === EReportType.commitionReport) {
        addCommissionsReportsFormatters(fields);
      } else if (reportName === EReportType.cachBalances) {
        addCashBalancesReportFormatters(fields);
      }

      this.setState({
        data,
        columns,
        fields,
        sending: false,
        sortBy: reportName === EReportType.cachBalances ? 'settlement_date' : void 0,
      });

    } catch (e) {
      console.error('ApplReportsPanel#getReport error:', e);
      this.props.notifyError(`Error on get report: ${e.message || e}`);
      this.setState({ sending: false });
    }
  }
}

export const ApplReportsPanel =
  connect(null, mapDispatchNotifyActions)(ApplReportsPanelComponent);

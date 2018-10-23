import * as React from 'react';

import { ApplPanel, ApplPanelSeparator } from '@appl/components/Appl';
import { AppTitle } from '@common/components/AppTitle';

import {
  ApplAccountReservationTable,
  ApplCashPositionSummaryTable,
  ApplEquityPositionSummaryTable,
  ApplOrderSummaryTable,
  IApplOverviewTableAPI,
} from '@appl/components/ApplOverviewPanel';
import { BSWebSocket } from '@common/core/services';

export class ApplOverviewPanel extends React.Component {
  private static INVALIDATE_SIGNALS = [
    'client_registration_service:peer:saved_Transfer',
    'client_registration_service:peer:saved_CashTransferRequest',
    'client_registration_service:peer:balance_update',
    'client_registration_service:peer:saved_Order',
    'client_registration_service:peer:saved_Trade',
  ];

  private tableAPIs: IApplOverviewTableAPI[] = [];

  public async componentDidMount() {
    BSWebSocket.subscribeSignals(ApplOverviewPanel.INVALIDATE_SIGNALS, this.invalidateTableActuality);
  }

  public async componentWillUnmount() {
    BSWebSocket.unsubscribeSignals(ApplOverviewPanel.INVALIDATE_SIGNALS, this.invalidateTableActuality);
  }

  public render() {
    return (
      <ApplPanel>
        <AppTitle append='Overview'>
          <ApplCashPositionSummaryTable apiRef={this.addTableRef} />

          <ApplPanelSeparator />

          <ApplEquityPositionSummaryTable apiRef={this.addTableRef} />

          <ApplPanelSeparator />

          <ApplAccountReservationTable apiRef={this.addTableRef} />

          <ApplPanelSeparator />

          <ApplOrderSummaryTable apiRef={this.addTableRef} />
        </AppTitle>
      </ApplPanel>
    );
  }

  private invalidateTableActuality = () => {
    this.tableAPIs.forEach((tableAPI) => {
      tableAPI.invalidate();
    });
  }

  private addTableRef = (tableAPI: IApplOverviewTableAPI) => {
    this.tableAPIs.push(tableAPI);
  }
}

import { List } from 'immutable';
import * as React from 'react';
import { connect } from 'react-redux';

import { ITableData, ITableFieldMetaData, TableCurrency } from '@common/core/types';

import { ApplBalancesPanelContainer,
  balanceHistoryServiceFetchAll,
  IBSBalancesSearchFormValues,
} from '@appl/components/ApplBalances';
import { liveOrdersServiceFetchAll } from '@appl/core/services/LiveOrders';
import { TOption } from '@common/components';
import { IDispatchNotifyActionsProps, mapDispatchNotifyActions } from '@common/core/connectors';

interface IApplBalancesPanelState {
  data: ITableData;
  fields: List<ITableFieldMetaData>;
  sending: boolean;
  accountOptions: TOption[];
}

class ApplBalancesPanelComponent extends React.Component<IDispatchNotifyActionsProps, IApplBalancesPanelState> {
  public state = {
    data: [],
    fields: List<ITableFieldMetaData>([
      { fieldName: 'settlementDate', sortKey: 'settlementDate', label: 'Date', sortAs: Date },
      { fieldName: 'EUR', sortKey: 'EUR', label: 'EUR', fieldType: TableCurrency },
      { fieldName: 'SEK', sortKey: 'SEK', label: 'SEK', fieldType: TableCurrency },
      { fieldName: 'GBP', sortKey: 'GBP', label: 'GBP', fieldType: TableCurrency },
      { fieldName: 'JPY', sortKey: 'JPY', label: 'JPY', fieldType: TableCurrency },
      { fieldName: 'usdEquivalent', sortKey: 'usdEquivalent', label: 'Total USD (Eqv)', fieldType: TableCurrency },
    ]),
    accountOptions: [],
    sending: false,
  };

  public async componentDidMount() {
    try {
      const liveOrders = await liveOrdersServiceFetchAll();
      this.setState({
        accountOptions: liveOrders.runningAccounts,
      });
    } catch (err) {
      this.props.notifyError(
        `Unable load data: ${err.message || String(err)}`,
      );
    }
  }

  public render() {
    const { accountOptions, fields, data, sending } = this.state;

    return (
      <ApplBalancesPanelContainer
        accountOptions={accountOptions}
        data={data}
        fields={fields.toArray()}
        sending={sending}
        onSearchSubmit={this.getReport}
      />
    );
  }

  private getReport = async (values: IBSBalancesSearchFormValues) => {
    this.setState({ sending: true });

    try {
      const items = await balanceHistoryServiceFetchAll(values.account, values.dateFrom, values.dateTo);

      this.setState({
        data: items,
        sending: false,
      });

    } catch (e) {
      this.props.notifyError(`${e.message || e}`);
      this.setState({ sending: false });
    }
  }
}

export const ApplBalancesPanel =
  connect(null, mapDispatchNotifyActions)(ApplBalancesPanelComponent);

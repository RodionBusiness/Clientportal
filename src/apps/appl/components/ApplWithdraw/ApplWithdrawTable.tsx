import { List } from 'immutable';
import * as React from 'react';
import { connect } from 'react-redux';

import { ApplReadOnlyTablePanel } from '@appl/components/Appl';
import { TWithdrawCollection, withdrawServiceFetchAll } from '@appl/components/ApplWithdraw';
import { TClearingAccount } from '@appl/core/services/LiveOrders';
import { IDispatchNotifyActionsProps, mapDispatchNotifyActions } from '@common/core/connectors';
import { BSWebSocket } from '@common/core/services';
import { ITableFieldMetaData, TableCurrency } from '@common/core/types';

interface IApplWithdrawTableOwnProps {
  clearingAccount: TClearingAccount | null;
}

interface IApplWithdrawTableState {
  withdrawals: TWithdrawCollection;
  loading: boolean;
}

type TApplWithdrawTableComponentProps = IDispatchNotifyActionsProps & IApplWithdrawTableOwnProps;

export class ApplWithdrawTableComponent
  extends React.Component<TApplWithdrawTableComponentProps, IApplWithdrawTableState> {
  private static fields = List<ITableFieldMetaData>([
    { fieldName: 'sourced', label: 'Sourced', sortAs: Date },
    { fieldName: 'fromAccount', label: 'From' },
    { fieldName: 'toAccount', label: 'To' },
    { fieldName: 'currency', label: 'Ccy' },
    { fieldName: 'amount', sortKey: 'to_amount', label: 'Amount', fieldType: TableCurrency },
    { fieldName: 'status', sortKey: 'request_status', label: 'Status' },
    { fieldName: 'refID', sortKey: 'depo_id_wired', label: 'RefID' },
  ]);

  constructor(props: TApplWithdrawTableComponentProps) {
    super(props);

    this.state = {
      withdrawals: {
        pagination: {
          limit: 10,
          pagesCount: 0,
          page: 1,
          total: 0,
        },
        ordering: {
          sortBy: 'sourced',
          reverse: false,
        },
        items: [],
      },
      loading: false,
    };
  }

  public async componentDidMount() {
    BSWebSocket.subscribeSignal('client_registration_service:peer:saved_Transfer', this.onTableUpdate);

    const { withdrawals } = this.state;
    this.updateTable({
      ...withdrawals,
    });
  }

  public async componentWillUnmount() {
    BSWebSocket.unsubscribeSignal('client_registration_service:peer:saved_Transfer', this.onTableUpdate);
  }

  public render() {
    const { items, ordering, pagination } = this.state.withdrawals;
    const { loading } = this.state;

    return (
      <ApplReadOnlyTablePanel
        table={{
          data: items,
          fields: ApplWithdrawTableComponent.fields.toArray(),
        }}
        sortBy={ordering.sortBy}
        sortAsc={ordering.reverse}
        page={pagination.page}
        pages={pagination.pagesCount}
        onSetPage={this.onSetPage}
        loading={loading}
        onSortSet={this.onSortSet}
      />
    );
  }

  private onTableUpdate = async () => {
    const { withdrawals } = this.state;

    this.updateTable({
      ...withdrawals,
    });
  }

  private onSortSet = async (sortBy: string, reverse: boolean) => {
    const { withdrawals } = this.state;

    this.updateTable({
      ...withdrawals,
      ordering: {
        sortBy,
        reverse,
      },
    });
  }

  private onSetPage = async (page: number) => {
    const pagination = this.state.withdrawals.pagination;
    const withdrawals = this.state.withdrawals;

    this.updateTable({
      ...withdrawals,
      pagination: {
        ...pagination,
        page,
      },
    });
  }

  private updateTable = async (withdrawals: TWithdrawCollection) => {
    try {
      const newWithdrawals = await withdrawServiceFetchAll(withdrawals);
      this.setState({
        withdrawals: newWithdrawals,
      });
    } catch (err) {
      this.props.notifyError(err.message || String(err));
    }
  }
}

export const ApplWithdrawTable =
  connect(null, mapDispatchNotifyActions)(ApplWithdrawTableComponent);

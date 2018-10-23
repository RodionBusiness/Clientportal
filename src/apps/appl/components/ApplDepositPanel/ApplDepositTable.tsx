import { List } from 'immutable';
import * as React from 'react';
import { connect } from 'react-redux';

import { ApplReadOnlyTablePanel } from '@appl/components/Appl';
import {
  depositsServiceFetchAll,
  IApplDepositPopupAPI,
  IDepositCollectionItemModel,
  TDepositCollection,
} from '@appl/components/ApplDepositPanel';
import { TClearingAccount } from '@appl/core/services/LiveOrders';
import { IDispatchNotifyActionsProps, mapDispatchNotifyActions } from '@common/core/connectors';
import { BSWebSocket } from '@common/core/services';
import { ITableFieldMetaData, TableCurrency } from '@common/core/types';

interface IApplDepositTableOwnProps {
  modalApi?: IApplDepositPopupAPI;
  clearingAccount: TClearingAccount | null;
}

interface IApplDepositTableState {
  deposits: TDepositCollection;
  loading: boolean;
}

type TApplDepositTableComponentProps = IDispatchNotifyActionsProps & IApplDepositTableOwnProps;

export class ApplDepositTableComponent
  extends React.Component<TApplDepositTableComponentProps, IApplDepositTableState> {

  private static fields = List<ITableFieldMetaData>([
    { fieldName: 'sourced', label: 'Sourced', sortAs: Date },
    { fieldName: 'fromAccount', label: 'From' },
    { fieldName: 'currency', label: 'Ccy' },
    { fieldName: 'amount', sortKey: 'to_amount', label: 'Amount', fieldType: TableCurrency },
    { fieldName: 'status', sortKey: 'request_status', label: 'Status' },
    { fieldName: 'refID', sortKey: 'depo_id_wired', label: 'RefID' },
  ]);

  constructor(props: TApplDepositTableComponentProps) {
    super(props);

    this.state = {
      deposits: {
        pagination: {
          limit: 10,
          pagesCount: 0,
          page: 1,
          total: 0,
        },
        ordering: {
          sortBy: 'request_date',
          reverse: false,
        },
        items: [],
      },
      loading: false,
    };
  }
  public async componentDidMount() {
    BSWebSocket.subscribeSignal('client_registration_service:peer:saved_Transfer', this.onTableUpdate);

    const { deposits } = this.state;
    this.updateTable({
      ...deposits,
    });
  }

  public async componentWillUnmount() {
    BSWebSocket.unsubscribeSignal('client_registration_service:peer:saved_Transfer', this.onTableUpdate);
  }

  public render() {
    const { items, ordering, pagination } = this.state.deposits;
    const { loading } = this.state;

    return (
      <ApplReadOnlyTablePanel
        table={{
          data: items,
          fields: ApplDepositTableComponent.fields.toArray(),
        }}
        sortBy={ordering.sortBy}
        sortAsc={ordering.reverse}
        page={pagination.page}
        pages={pagination.pagesCount}
        onSetPage={this.onSetPage}
        loading={loading}
        onRowClick={this.onRowClick}
        onSortSet={this.onSortSet}
      />
    );
  }

  private onTableUpdate = async () => {
    const { deposits } = this.state;

    this.updateTable({
      ...deposits,
    });
  }

  private onSortSet = async (sortBy: string, reverse: boolean) => {
    const { deposits } = this.state;

    this.updateTable({
      ...deposits,
      ordering: {
        sortBy,
        reverse,
      },
    });
  }

  private onSetPage = async (page: number) => {
    const pagination = this.state.deposits.pagination;
    const deposits = this.state.deposits;

    this.updateTable({
      ...deposits,
      pagination: {
        ...pagination,
        page,
      },
    });
  }

  private updateTable = async (deposits: TDepositCollection) => {
    try {
      const newDeposits = await depositsServiceFetchAll(deposits);
      this.setState({
        deposits: newDeposits,
      });
    } catch (err) {
      this.props.notifyError(err.message || String(err));
    }
  }

  private onRowClick = (row: IDepositCollectionItemModel) => {
    if (this.props.modalApi) {
      this.props.modalApi.show(this.props.clearingAccount, row);
    }
  }
}

export const ApplDepositTable =
  connect(null, mapDispatchNotifyActions)(ApplDepositTableComponent);

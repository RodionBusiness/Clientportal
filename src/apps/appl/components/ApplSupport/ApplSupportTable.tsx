import { List } from 'immutable';
import * as moment from 'moment';
import * as React from 'react';
import { connect } from 'react-redux';

import { ApplReadOnlyTablePanel } from '@appl/components/Appl';
import { IApplPopupAPI } from '@appl/components/Appl/ApplPopup';
import {
  ISupportCollectionItemModel,
  supportServiceFetchAll,
  TSupportCollection,
} from '@appl/components/ApplSupport';
import { ApplSupportPopup } from '@appl/components/ApplSupport/ApplSupportPopup';
import { IDispatchNotifyActionsProps, mapDispatchNotifyActions } from '@common/core/connectors';
import { BSWebSocket } from '@common/core/services';
import { ITableFieldMetaData } from '@common/core/types';

interface IApplSupportTableState {
  messages: TSupportCollection;
  loading: boolean;
}

export class ApplSupportTableComponent
  extends React.Component<IDispatchNotifyActionsProps, IApplSupportTableState> {
  private static fields = List<ITableFieldMetaData>([
    { fieldName: 'id', label: 'Ref Id' },
    { fieldName: 'date', label: 'Date' },
    { fieldName: 'subject', label: 'Subject' },
    { fieldName: 'issueDisplay', label: 'Details' },
    { fieldName: 'responseDisplay', label: 'Response' },
    { fieldName: 'status', label: 'Status' },
    { fieldName: 'author', label: 'Raised by' },
  ]);

  private popupAPI?: IApplPopupAPI;

  constructor(props: IDispatchNotifyActionsProps) {
    super(props);

    this.state = {
      messages: {
        pagination: {
          limit: 10,
          pagesCount: 0,
          page: 1,
          total: 0,
        },
        filters: {
          startDate: moment().add(-1, 'year').startOf('day'),
          endDate: moment().endOf('day'),
        },
        items: [],
      },
      loading: false,
    };
  }

  public async componentDidMount() {
    BSWebSocket.subscribeSignal('client_registration_service:peer:saved_IssueFeedback', this.onTableUpdate);

    const { messages } = this.state;
    this.updateTable({
      ...messages,
    });
  }

  public async componentWillUnmount() {
    BSWebSocket.unsubscribeSignal('client_registration_service:peer:saved_IssueFeedback', this.onTableUpdate);
  }

  public render() {
    const { items, pagination } = this.state.messages;
    const { loading } = this.state;

    return (
      <div>
        <ApplReadOnlyTablePanel
          table={{
            data: items,
            fields: ApplSupportTableComponent.fields.toArray(),
          }}
          page={pagination.page}
          pages={pagination.pagesCount}
          onSetPage={this.onSetPage}
          loading={loading}
          onRowClick={this.onRowClick}
        />
        <ApplSupportPopup apiRef={this.setPopupRef} onSubmit={this.onTableUpdate} />
      </div>
    );
  }

  private onRowClick = async (row: ISupportCollectionItemModel) => {
    if (this.popupAPI) {
      this.popupAPI.show(row);
    }
  }

  private onTableUpdate = async () => {
    const { messages } = this.state;

    this.updateTable({
      ...messages,
    });
  }

  private onSetPage = async (page: number) => {
    const pagination = this.state.messages.pagination;
    const messages = this.state.messages;

    this.updateTable({
      ...messages,
      pagination: {
        ...pagination,
        page,
      },
    });
  }

  private updateTable = async (messages: TSupportCollection) => {
    try {
      const newMessages = await supportServiceFetchAll(messages);
      this.setState({
        messages: newMessages,
        loading: true,
      });
    } catch (err) {
      this.props.notifyError(err.message || String(err));
    }

    this.setState({ loading: false });
  }

  private setPopupRef = (ref: IApplPopupAPI) =>
    this.popupAPI = ref
}

export const ApplSupportTable =
  connect(null, mapDispatchNotifyActions)(ApplSupportTableComponent);

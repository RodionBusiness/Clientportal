import { List } from 'immutable';
import * as moment from 'moment';
import * as React from 'react';

import { ApplPaginatedTablePanel, TSearchCriteria } from '@appl/components/Appl';
import { ApplTradesTableSearchForm, ISearchCriteria } from '@appl/components/ApplTradesPanel';
import { getClientTradeHistoryInstruments } from '@appl/core/services/ClientControl';
import { TInstrumentsList } from '@appl/core/types';
import { ITableFieldMetaData, pickLabelOptions, TableCurrency } from '@common/core/types';

interface IApplTradesTableState {
  currencies: TInstrumentsList;
  criteria: {
    id?: string | void;
    trade_date?: string | void;
    trade_status?: string | void;
    tradetype?: string | void;
    instrument_display_name?: string | void;
  };
}

export class ApplTradesTable extends React.Component<{}, IApplTradesTableState> {
  public state: IApplTradesTableState = {
    criteria: {},
    currencies: [],
  };

  public async componentDidMount() {
    const currencies = await getClientTradeHistoryInstruments();
    this.setState({ currencies });
  }

  public render() {
    const { currencies, criteria } = this.state;

    return (
      <ApplPaginatedTablePanel
        titleAppend={(
          <ApplTradesTableSearchForm onSearch={this.onSearch} currencies={currencies} />
        )}
        model='Trade'
        rowsPerPage={20}
        fields={List<ITableFieldMetaData>([
          { fieldName: 'id', sortKey: 'id', label: 'Trade ID', sortAs: Number },
          { fieldName: 'trade_date', sortKey: 'trade_date', label: 'Trade Date', sortAs: Date },
          { fieldName: 'entity', sortKey: 'entity', label: 'Acquirer', ...pickLabelOptions },
          { fieldName: 'entity_account', sortKey: 'entity_account', label: 'Account', ...pickLabelOptions },
          { fieldName: 'trade_status', sortKey: 'trade_status', label: 'Trade Status', ...pickLabelOptions },
          {
            fieldName: 'instrument_display_name',
            sortKey: 'instrument_display_name',
            label: 'Instrument',
            ...pickLabelOptions,
          },
          {
            fieldName: 'fx_ass_qty',
            sortKey: 'fx_ass_qty',
            label: 'Base Qty',
            fieldType: TableCurrency,
            precision: (row) => {
              const isEquity = String(row.instrument_type).toLocaleLowerCase() === 'equity';
              const isCurrency = String(row.instrument_type).toLocaleLowerCase() === 'currency';
              const toXBT = String(row.instrument_display_name).toLocaleUpperCase().match('/XBT');
              const fromXBT = String(row.instrument_display_name).toLocaleUpperCase().match('XBT/');

              if (toXBT && isEquity) {
                return 0;
              }

              if (fromXBT && isCurrency) {
                return 8;
              }

              return 2;
            },
          },
          {
            fieldName: 'price',
            sortKey: 'price',
            label: 'Price',
            fieldType: TableCurrency,
            precision: (row) => {
              const isEquity = String(row.instrument_type).toLocaleLowerCase() === 'equity';
              const isCurrency = String(row.instrument_type).toLocaleLowerCase() === 'currency';
              const toXBT = String(row.instrument_display_name).toLocaleUpperCase().match('/XBT');
              const fromXBT = String(row.instrument_display_name).toLocaleUpperCase().match('XBT/');

              if (toXBT && isEquity) {
                return 6;
              }

              if (fromXBT && isCurrency) {
                return 2;
              }

              return 4;
            },
          },
          {
            fieldName: 'alt_position',
            sortKey: 'alt_position',
            label: 'Counter Qty',
            fieldType: TableCurrency,
            precision: (row) => {
              const isEquity = String(row.instrument_type).toLocaleLowerCase() === 'equity';
              const isCurrency = String(row.instrument_type).toLocaleLowerCase() === 'currency';
              const toXBT = String(row.instrument_display_name).toLocaleUpperCase().match('/XBT');
              const fromXBT = String(row.instrument_display_name).toLocaleUpperCase().match('XBT/');

              if (toXBT && isEquity) {
                return 6;
              }

              if (fromXBT && isCurrency) {
                return 2;
              }

              return 2;
            },
          },
          { fieldName: 'instrument_type', sortKey: 'instrument_type', label: 'Type' },
        ])}
        criteria={criteria as TSearchCriteria}
        requestData={this.requestData}
      />
    );
  }

  private onSearch = ({
    tradeId,
    tradeDate,
    tradeStatus,
    tradeType,
    instrumentDisplayName,
  }: ISearchCriteria) => {
    this.setState({
      criteria: {
        id: tradeId || void 0,
        trade_date: tradeDate ? moment(tradeDate).format('DD/MM/YYYY') : void 0,
        trade_status: tradeStatus || void 0,
        tradetype: tradeType || void 0,
        instrument_display_name: instrumentDisplayName || void 0,
      },
    });
  }

  private requestData = () => ({ summary: null });
}

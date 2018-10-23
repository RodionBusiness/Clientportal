import * as React from 'react';

import { ApplReadOnlyTablePanel } from '@appl/components/Appl';
import { ApplOverviewPanelUpdateButton } from '@appl/components/ApplOverviewPanel';
import { TBSTableLayout } from '@common/components';
import { BSWebSocket } from '@common/core/services';
import { ITableData, ITableFieldMetaData } from '@common/core/types';

export interface IApplOverviewTableAPI {
  invalidate(): void;
}

export interface IApplOverviewTableCommonProps {
  apiRef?(api: IApplOverviewTableAPI): void;
}

interface IApplOverviewTableProps {
  title: string;
  fields: ITableFieldMetaData[];
  fetchingService: string;
  fetchingMethod: string;
  tableLayout?: TBSTableLayout;
}

type TProps = IApplOverviewTableCommonProps & IApplOverviewTableProps;

interface IState {
  data: ITableData;
  outdated: boolean;
}

export class ApplOverviewTable extends React.Component<TProps, IState> {
  public state: IState = {
    data: [],
    outdated: false,
  };

  public api: IApplOverviewTableAPI = {
    invalidate: () => this.setState({ outdated: true }),
  };

  public constructor(props: TProps) {
    super(props);
  }

  public componentDidMount() {
    const { apiRef } = this.props;
    if (apiRef) {
      apiRef(this.api);
    }
  }

  public async componentWillMount() {
    await this.fetchData();
  }

  public render() {
    const { data, outdated } = this.state;
    const { title, tableLayout } = this.props;

    return (
      <ApplReadOnlyTablePanel
        title={title}
        tableLayout={tableLayout}
        titleAppend={(
          <ApplOverviewPanelUpdateButton
            outdated={outdated}
            onClick={this.onUpdateClick}
          />
        )}
        table={{
          data,
          fields: Array.from(this.props.fields),
        }}
      />
    );
  }

  private onUpdateClick = () => {
    this.fetchData();
  }

  private async fetchData() {
    const { fetchingService, fetchingMethod } = this.props;

    try {
      const { items } = await BSWebSocket.invoke<{ items: ITableData }>(
        fetchingService,
        fetchingMethod,
      );

      this.setState({ data: items, outdated: false });

    } catch (err) {
      console.error('error on fetch table data:', err);
    }
  }
}

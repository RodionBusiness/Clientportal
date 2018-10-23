import { List } from 'immutable';
import * as React from 'react';

import { ApplPaginatedTablePanel, IApplPaginatedTablePanelAPI } from '@appl/components/Appl';
import { ITableFieldMetaData, pickLabelOptions } from '@common/core/types';

export interface IEntityFile {
  file: {
    label: string,
  };
  id: number;
  surrogate_path: string;
}

export interface IApplEntityFilesTableAPI {
  refresh(): void;
}

interface IApplEntityFilesTableProps {
  onFileClick?(file: IEntityFile): void;
  apiRef?(formApi: IApplEntityFilesTableAPI): void;
}

export class ApplEntityFilesTable extends React.Component<IApplEntityFilesTableProps, {}> {
  public api: IApplEntityFilesTableAPI = {
    refresh: () => {
      if (this.tableApiRef) {
        this.tableApiRef.refresh();
      }
    },
  };

  private tableApiRef?: IApplPaginatedTablePanelAPI;

  public componentDidMount() {
    const { apiRef } = this.props;
    if (apiRef) {
      apiRef(this.api);
    }
  }

  public render() {
    return (
      <ApplPaginatedTablePanel
        model='F2E'
        rowsPerPage={20}
        onRowClick={this.onRowClick}
        fields={List<ITableFieldMetaData>([
          { fieldName: 'file', label: 'File', ...pickLabelOptions },
        ])}
        requestData={this.requestData}
        criteria={{}}
        apiRef={this.setTableApiRef}
      />
    );
  }

  private onRowClick = (row: IEntityFile) => {
    if (this.props.onFileClick) {
      this.props.onFileClick(row);
    }
  }
  private setTableApiRef = (api: IApplPaginatedTablePanelAPI) => {
    this.tableApiRef = api;
  }

  private requestData = () => ({ summary: null });
}

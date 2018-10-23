import * as React from 'react';
import { Button, ButtonGroup, Col, FormGroup, Row } from 'reactstrap';

import { ApplPanel } from '@appl/components/Appl';
import {
  ApplEntityFilesTable,
  ApplEntityFilesView,
  entityFilesServiceDelete,
  IApplEntityFilesTableAPI,
  IEntityFile,
} from '@appl/components/ApplEntityFiles';
import { AppTitle, PageHeader } from '@common/components';
import { IDispatchNotifyActionsProps } from '@common/core/connectors';

interface IApplEntityFilesPanelState {
  loading: boolean;
  currentFile: IEntityFile | null;
}

export class ApplEntityFilesPanel extends React.Component<IDispatchNotifyActionsProps, IApplEntityFilesPanelState> {
  private tableApiRef?: IApplEntityFilesTableAPI;

  constructor(props: IDispatchNotifyActionsProps) {
    super(props);

    this.state = {
      loading: false,
      currentFile: null,
    };
  }

  public render() {
    const { currentFile, loading } = this.state;

    return (
      <ApplPanel>
        <AppTitle append='Entity Files'>
          <PageHeader title='Entity Files' />
          <Row>
            <Col xs='6'>
              <ApplEntityFilesTable onFileClick={this.onShowFile} apiRef={this.setTableApiRef} />
            </Col>
            <Col xs='6'>
              {currentFile &&
                <div>
                  <FormGroup className='text-right'>
                    <ButtonGroup>
                      <Button
                        color='secondary'
                        onClick={this.onClose}
                      >
                        Close
                      </Button>{' '}

                      <a
                        className='btn btn-primary'
                        href={ApplEntityFilesView.buildFileUrl(currentFile.surrogate_path)}
                        download={true}
                      >
                        Download
                      </a>

                      <Button
                        color='danger'
                        disabled={loading}
                        onClick={this.onDelete}
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </FormGroup>
                  <ApplEntityFilesView file={currentFile.surrogate_path} />
                </div>
              }
            </Col>
          </Row>
        </AppTitle>
      </ApplPanel>
    );
  }

  private onShowFile = (file: IEntityFile) => {
    this.setState({ currentFile: file });
  }

  private setTableApiRef = (api: IApplEntityFilesTableAPI) => {
    this.tableApiRef = api;
  }

  private onClose = () => {
    this.setState({ currentFile: null });
  }

  private onDelete = async () => {
    if (!this.state.currentFile) {
      return;
    }

    this.setState({ loading: true });
    try {
      await entityFilesServiceDelete(this.state.currentFile.id);
      if (this.tableApiRef) {
        this.tableApiRef.refresh();
      }
      this.setState({ currentFile: null });
    } catch (err) {
      this.props.notifyError(
        `${err.message || String(err)}`,
      );
    }
    this.setState({ loading: false });
  }
}

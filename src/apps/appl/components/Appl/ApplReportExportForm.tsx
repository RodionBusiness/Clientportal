import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Input } from 'reactstrap';

import { saveReport } from '@appl/core/services/ClientReporting';
import { TReportColumns } from '@appl/core/types';
import { IDispatchNotifyActionsProps, mapDispatchNotifyActions } from '@common/core/connectors';
import { ITableData } from '@common/core/types';

interface IApplReportExportFormOwnProps {
  tableType: string;
  exportRows: ITableData;
  exportCols: TReportColumns;
  exportDateFrom?: string;
  exportDateTo?: string;
  blocked?: boolean;
}

type IApplReportExportFormProps = IApplReportExportFormOwnProps & IDispatchNotifyActionsProps;

interface IApplReportExportFormState {
  selectedFileType: string;
  working: boolean;
}

export class ApplReportExportFormComponent
  extends React.Component<IApplReportExportFormProps, IApplReportExportFormState> {

  public state = {
    selectedFileType: '',
    working: false,
  };

  private SELECT_FILE_TYPE_OPTIONS = [
    { value: '', label: 'Select File Type...' }, // no value option
    { value: 'html', label: 'HTML' },
    { value: 'json', label: 'JSON' },
    { value: 'csv', label: 'CSV' },
    { value: 'txt', label: 'Plain Text' },
    { value: 'xlsx', label: 'XLSX' },
  ];

  public render() {
    const { selectedFileType } = this.state;

    return (
      <Form tag='div' inline={true}>
        <FormGroup>
          <Input
            type='select'
            name='selectedFileType'
            value={selectedFileType}
            onChange={this.onFileTypeSelect}
            disabled={this.isBlockedSelect()}
            className='helper__mr--05rem'
          >
            {this.SELECT_FILE_TYPE_OPTIONS.map(
              ({ value, label }, key) => (
                <option
                  key={`select-option-selectedFileType-${key}`}
                  aria-selected={value === selectedFileType}
                  value={value}
                >
                  {label || value}
                </option>
              ),
            )}
          </Input>

          <Button
            color='primary'
            type='button'
            onClick={this.onSubmit}
            disabled={this.isBlockedSubmit()}
          >
            Export to Entity Files
          </Button>
        </FormGroup>
      </Form>
    );
  }

  private isBlockedSelect = () =>
    this.props.blocked || !this.props.exportRows.length || this.state.working

  private isBlockedSubmit = () =>
    this.isBlockedSelect() || this.state.working || !this.state.selectedFileType

  private onFileTypeSelect = (evt: React.SyntheticEvent<HTMLInputElement>) =>
    this.setState({
      selectedFileType: evt.currentTarget.value || '',
    })

  private onSubmit = async () => {
    this.setState({ working: true });

    try {
      const result = await saveReport({
        fileType: this.state.selectedFileType,
        cols: this.props.exportCols,
        rows: this.props.exportRows,
        dateFrom: this.props.exportDateFrom,
        dateTo: this.props.exportDateTo,
        reportType: this.props.tableType,
      });

      this.props.notifySuccess(`File successfully saved as ${result}`);

    } catch (err) {
      this.props.notifyError(err.message || String(err));
    }

    this.setState({ working: false });
  }
}

export const ApplReportExportForm =
  connect(null, mapDispatchNotifyActions)(ApplReportExportFormComponent);

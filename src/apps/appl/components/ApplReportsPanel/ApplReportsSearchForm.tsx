import * as moment from 'moment';
import * as React from 'react';
import { Button, Col, Form, FormGroup, Label, Row } from 'reactstrap';

import { ApplCurrencyLookup, ApplPrincipalQtySelect, ApplReportExportForm } from '@appl/components/Appl';
import { EReportType, TReportColumns } from '@appl/core/types';
import { BSCheckboxInput, BSDatePicker, BSInput, BSNativeForm, BSSelect } from '@common/components';
import { ITableData } from '@common/core/types';

export interface IBSReportsSearchFormValues {
  account: string | null;
  currencyID:  string | null;
  principalQty:  string | null;
  reportName: EReportType.cachBalances | EReportType.commitionReport | string;
  tradeType: string | null;
  feeOnly: boolean | null;
  search: string | null;
  dateFrom: string;
  dateTo: string;
}

const REPORT_NAME_OPTIONS = [
  { value: EReportType.commitionReport, label: 'Commission' },
  { value: EReportType.cachBalances, label: 'Cash Balances' },
];

const TRADE_TYPE_OPTIONS = [
  { value: 'FXTrade', label: 'Currency' },
  { value: 'ExchangeTrade', label: 'Equity' },
];

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

interface IApplReportsSearchFormProps {
  sending: boolean;
  exportRows: ITableData;
  exportCols: TReportColumns;
  onSubmit(values: IBSReportsSearchFormValues): void;
}

class BSReportsSearchForm extends BSNativeForm<{}, IBSReportsSearchFormValues> {}

export const ApplReportsSearchForm: React.StatelessComponent<IApplReportsSearchFormProps> =
  ({ onSubmit, sending, exportCols, exportRows }) => (
    <BSReportsSearchForm
      onSubmit={onSubmit}
      defaults={{
        reportName: '',
        account: '',
        currencyID: '',
        tradeType: '',
        feeOnly: false,
        search: '',
        dateFrom: moment().add(-1, 'month').startOf('day').format(DATE_FORMAT),
        dateTo: moment().endOf('day').format(DATE_FORMAT),
      }}
    >
      {(formApi, { reportName, dateFrom, dateTo }) => (
        <div>
          <Row className='helper__mb--1rem'>
            <Col sm={5} lg={3}>
              <BSSelect
                label='Select Report Type...'
                field='reportName'
                formApi={formApi}
                options={REPORT_NAME_OPTIONS}
                required={true}
              />
            </Col>
          </Row>

          <Row className='helper__mb--1rem'>
            <Col sm={4}>
              {(reportName === EReportType.commitionReport) && (
                <div className='d-flex'>
                  <BSSelect
                    className='helper__mr--05rem'
                    formApi={formApi}
                    field='tradeType'
                    label='Trade Type'
                    options={TRADE_TYPE_OPTIONS}
                  />
                  <ApplPrincipalQtySelect
                    formApi={formApi}
                    field='principalQty'
                    label='Base Qty'
                  />
                </div>
              )}
              {(reportName === EReportType.cachBalances) && (
                <div className='d-flex'>
                  <BSInput
                    className='helper__mr--05rem'
                    field='search'
                    type='text'
                    placeholder='Notes'
                    formApi={formApi}
                  />
                  <ApplCurrencyLookup
                    field='currencyID'
                    formApi={formApi}
                  />
                </div>
              )}
            </Col>
            <Col sm={8} className='helper__flex-align--right'>
              <Form tag='div' inline={true}>
                <FormGroup>
                  <Label className='helper__semibold helper__pr--05rem' htmlFor='dateFrom'>
                    {`From: `}
                  </Label>

                  <div className='helper__pr--05rem'>
                    <BSDatePicker
                      field='dateFrom'
                      formApi={formApi}
                      required={true}
                      placeholderText='Date From'
                      maxDate={moment(formApi.stringValue('dateTo') || void 0).add(-1, 'day')}
                    />
                  </div>

                  <Label className='helper__semibold helper__pr--05rem' htmlFor='dateTo'>
                    {` To: `}
                  </Label>

                  <div className='helper__pr--05rem'>
                    <BSDatePicker
                      field='dateTo'
                      formApi={formApi}
                      required={true}
                      placeholderText='Date To'
                    />
                  </div>

                  <Button
                    type='submit'
                    color='primary'
                    disabled={sending || !formApi.valid()}
                  >
                    Search
                  </Button>
                </FormGroup>
              </Form>
            </Col>
          </Row>

          <Row className='helper__mb--1rem'>
            <Col sm={5} lg={3}>
              {(reportName === EReportType.cachBalances) && (
                <BSCheckboxInput
                  field='feeOnly'
                  formApi={formApi}
                >
                  {' Fee'}
                </BSCheckboxInput>
              )}
            </Col>

            <Col className='helper__flex-align--right'>
              <ApplReportExportForm
                blocked={sending}
                exportCols={exportCols}
                exportRows={exportRows}
                exportDateFrom={dateFrom}
                exportDateTo={dateTo}
                tableType={reportName}
              />
            </Col>
          </Row>
        </div>
      )}
    </BSReportsSearchForm>
  );

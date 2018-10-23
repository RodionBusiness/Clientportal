import * as moment from 'moment';
import * as React from 'react';
import { Button, Col, Form, FormGroup, Label, Row } from 'reactstrap';

import { ApplReportExportForm } from '@appl/components/Appl';
import { BSDatePicker, BSNativeForm, BSSelect, TOption } from '@common/components';
import { ITableData, ITableFieldMetaData } from '@common/core/types';

export interface IBSBalancesSearchFormValues {
  account: string;
  dateFrom: string;
  dateTo: string;
}

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

interface IApplBalancesSearchFormProps {
  sending: boolean;
  exportFields: ITableFieldMetaData[];
  exportRows: ITableData;
  runningAccountsOptions: TOption[];
  onSubmit(values: IBSBalancesSearchFormValues): void;
}

class BSBalancesSearchForm extends BSNativeForm<{}, IBSBalancesSearchFormValues> { }

export const ApplBalancesSearchForm: React.StatelessComponent<IApplBalancesSearchFormProps> =
  ({ onSubmit, sending, exportFields, exportRows, runningAccountsOptions }) => (
    <BSBalancesSearchForm
      onSubmit={onSubmit}
      defaults={{
        account: '',
        dateFrom: moment().add(-1, 'month').startOf('day').format(DATE_FORMAT),
        dateTo: moment().endOf('day').format(DATE_FORMAT),
      }}
    >
      {(formApi, { dateFrom, dateTo }) => (
        <div>
          <Row className='helper__mb--1rem'>
            <Col sm={5} lg={3}>
              <BSSelect
                label='Select Account'
                field='account'
                formApi={formApi}
                options={runningAccountsOptions}
                required={true}
              />
            </Col>

            <Col className='helper__flex-align--right'>
              <Form tag='div' inline={true}>
                <FormGroup>
                  <Label className='helper__semibold helper__pr--05rem' htmlFor='dateFrom'>From: </Label>
                  <div className='helper__pr--05rem'>
                    <BSDatePicker
                      field='dateFrom'
                      formApi={formApi}
                      required={true}
                      placeholderText='Date From'
                      maxDate={moment(formApi.stringValue('dateTo') || void 0).add(-1, 'day')}
                    />
                  </div>

                  <Label className='helper__semibold helper__pr--05rem' htmlFor='dateTo'>{` To: `}</Label>
                  <div className='helper__pr--05rem'>
                    <BSDatePicker field='dateTo' formApi={formApi} required={true} placeholderText='Date To' />
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
            <Col className='helper__flex-align--right'>
              <ApplReportExportForm
                tableType='running_balances'
                blocked={sending}
                exportCols={exportFields.map((item) => {
                  return {
                    col: item.fieldName,
                    label: item.label || '',
                    type: 'string',
                  };
                })}
                exportRows={exportRows}
                exportDateFrom={dateFrom}
                exportDateTo={dateTo}
              />
            </Col>
          </Row>
        </div>
      )}
    </BSBalancesSearchForm>
  );

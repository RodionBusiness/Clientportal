import * as React from 'react';
import { Col, Row } from 'reactstrap';

import { ApplPanel } from '@appl/components/Appl';
import {
  ApplDepositAddForm,
  ApplDepositPopup,
  ApplDepositTable,
  IApplDepositPopupAPI,
} from '@appl/components/ApplDepositPanel';
import { liveOrdersServiceFetchAll, TClearingAccount, TTradingAccount } from '@appl/core/services/LiveOrders';
import { AppTitle, PageHeader } from '@common/components';
import { IDispatchNotifyActionsProps } from '@common/core/connectors';

interface IApplDepositPanelState {
  modalApi: IApplDepositPopupAPI | undefined;
  clearingAccount: TClearingAccount | null;
  tradingAccounts: TTradingAccount[];
}

export class ApplDepositPanel extends React.Component<IDispatchNotifyActionsProps, IApplDepositPanelState> {
  public state: IApplDepositPanelState = {
    modalApi: undefined,
    clearingAccount: null,
    tradingAccounts: [],
  };

  public async componentDidMount() {
    try {
      const liveOrders = await liveOrdersServiceFetchAll();

      this.setState({
        clearingAccount: liveOrders.clearingAccount,
        tradingAccounts: liveOrders.tradingAccounts,
      });
    } catch (err) {
      this.props.notifyError(
        `Unable load data: ${err.message || String(err)}`,
      );
    }
  }

  public render() {
    const { clearingAccount, modalApi, tradingAccounts } = this.state;

    return (
      <ApplPanel>
        <AppTitle append='Deposit'>
          <PageHeader title='Deposit'>
            <p>
              Deposits are accepted via bank transfers and the minimum deposit needs to equal
              EUR 1,000 in any of the currencies we offer.
            </p>

            <p>
              Please register your deposit below by selecting currency and
              amount and generate a unique deposit reference.
            </p>

            <p>
              <strong>Important!</strong> Please make sure to include the deposit reference when you are making the
              bank transfer. Each deposit reference can only be used once! Any fees from the remitting
              bank should be added on top of the amount as variations between deposit request and
              received deposits might cause delays in the process of crediting your account.
            </p>
          </PageHeader>

          <Row>
            <Col xs='3'>
              <h2 className='mb-4'>Generate new Deposit</h2>

              <ApplDepositAddForm
                modalApi={modalApi}
                clearingAccount={clearingAccount}
                tradingAccounts={tradingAccounts}
              />
            </Col>

            <Col xs='9'>
              <h2 className='mb-4'>Deposit History</h2>
              <div className='helper__label-margin' />

              <ApplDepositTable
                modalApi={modalApi}
                clearingAccount={clearingAccount}
              />
            </Col>
          </Row>

          <ApplDepositPopup apiRef={this.setApiRef} />
        </AppTitle>
      </ApplPanel>
    );
  }

  private setApiRef = (ref: IApplDepositPopupAPI) =>
    this.setState({ modalApi: ref })
}

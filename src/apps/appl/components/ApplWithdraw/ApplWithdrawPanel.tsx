import * as React from 'react';
import { Col, Row } from 'reactstrap';

import { ApplPanel } from '@appl/components/Appl';
import { externalAccountServiceFetchAll, TExternalAccount } from '@appl/components/ApplWithdraw';
import { ApplWithdrawAddForm } from '@appl/components/ApplWithdraw/ApplWithdrawAddForm';
import { ApplWithdrawTable } from '@appl/components/ApplWithdraw/ApplWithdrawTable';
import { liveOrdersServiceFetchAll, TClearingAccount, TTradingAccount } from '@appl/core/services/LiveOrders';
import { AppTitle, PageHeader } from '@common/components';
import { IDispatchNotifyActionsProps } from '@common/core/connectors';

interface IApplWithdrawPanelState {
  externalAccounts: TExternalAccount[];
  withdrawalNotAllowed: boolean;
  clearingAccount: TClearingAccount | null;
  tradingAccounts: TTradingAccount[];
}

export class ApplWithdrawPanel extends React.Component<IDispatchNotifyActionsProps, IApplWithdrawPanelState> {
  public state: IApplWithdrawPanelState = {
    externalAccounts: [],
    clearingAccount: null,
    tradingAccounts: [],
    withdrawalNotAllowed: false,
  };

  public async componentDidMount() {
    try {
      const liveOrders = await liveOrdersServiceFetchAll();
      const externalAccounts = await externalAccountServiceFetchAll();

      this.setState({
        externalAccounts,
        withdrawalNotAllowed: externalAccounts.length < 1,
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
    const {
      clearingAccount,
      externalAccounts,
      tradingAccounts,
      withdrawalNotAllowed,
    } = this.state;

    return (
      <ApplPanel>
        <AppTitle append='Withdraw'>
          <PageHeader title='Withdraw'>
            <p>
              Here you can make withdrawal requests from your BlockSettle account to

              your Designated Bank Accounts. If you have not yet registered a bank
              account, you can do so{' '}
              <a href='/appl-add-bank-account'>here</a>.
            </p>

            <p>
              Only <em>one withdrawal</em> per day is permitted.
            </p>
          </PageHeader>

          <Row>
            <Col xs='3'>
              <h2 className='mb-4'>Withdrawal Request</h2>

              {withdrawalNotAllowed ? (
                <p className='text-warning'>
                  Withdrawals are enabled once a Bank Account has been registered to your account.
                </p>
              ) : (
                <ApplWithdrawAddForm
                  clearingAccount={clearingAccount}
                  tradingAccounts={tradingAccounts}
                  externalAccounts={externalAccounts}
                />
              )}
            </Col>

            <Col xs='9'>
              <h2 className='mb-4'>Withdrawal History</h2>
              <div className='helper__label-margin' />
              <ApplWithdrawTable clearingAccount={clearingAccount} />
            </Col>
          </Row>
        </AppTitle>
      </ApplPanel>
    );
  }
}

import * as moment from 'moment';

import { TExternalAccount } from '@appl/components/ApplWithdraw';
import { TTradingAccount } from '@appl/core/services/LiveOrders';

const DATE_FORMAT = 'YYYY-MM-DD';

export interface IWithdrawData {
  date: string; // 2017-12-05
  from_amount: string;
  from_details: {
    account_type: string,
    ccy: string,
    ccy_id: number,
    value: number | null,
  };
  request_type: string; // "Withdraw"
  to_amount: string;
  to_details: {
    account_type: string,
    ccy: string,
    ccy_id: number,
    value: number | null,
  };
}

export interface IWithdrawModel {
  tradingAccount: TTradingAccount;
  externalAccount: TExternalAccount;
  amount: number;
  date: Date;
  status?: string;
}

export const withdrawMapTo = ({ amount, date, externalAccount, tradingAccount }: IWithdrawModel): IWithdrawData => {
  return {
    date: moment(date).format(DATE_FORMAT),
    request_type: 'Withdraw',
    from_details: {
      ccy: tradingAccount.ccy,
      ccy_id: tradingAccount.ccyId,
      value: tradingAccount.value,
      account_type: tradingAccount.accountType,
    },
    from_amount: amount.toString(),
    to_amount: amount.toString(),
    to_details: {
      ccy: tradingAccount.ccy,
      ccy_id: tradingAccount.ccyId,
      value: externalAccount.value,
      account_type: externalAccount.accountType,
    },
  };
};

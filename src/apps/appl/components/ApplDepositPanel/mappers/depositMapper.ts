import * as moment from 'moment';

import { TTradingAccount } from '@appl/core/services/LiveOrders';

const DATE_FORMAT = 'YYYY-MM-DD';

export interface IDepositData {
  date: string; // 2017-12-05
  request_type: string; // Deposit
  from_amount: string;
  from_details: object;
  to_amount: string; // Equals to to_amount for Deposit
  to_details: {
    ccy: string,
    ccy_id: number,
    value: number | null,
    account_type: string,
  };
}

export interface IDepositModel {
  tradingAccount: TTradingAccount | null;
  amount: number;
  date: Date;
  refID?: string;
  status?: string;
}

interface INewDepositResponseData {
  depo_id_wired: string;
  request_status: string;
}

export const depositMapTo = ({ amount, date, tradingAccount }: IDepositModel): IDepositData => {
  return {
    date: moment(date).format(DATE_FORMAT),
    request_type: 'Deposit',
    from_details: {},
    from_amount: amount.toString(),
    to_amount: amount.toString(),
    to_details: {
      ccy: tradingAccount ? tradingAccount.ccy : '',
      ccy_id: tradingAccount ? tradingAccount.ccyId : -1,
      value: tradingAccount ? tradingAccount.value : null,
      account_type: tradingAccount ? tradingAccount.accountType : '',
    },
  };
};

export const depositMapFrom = (model: IDepositModel, item: INewDepositResponseData): IDepositModel => {
  return !item ?
  model
  :
  {
    ...model,
    refID: item.depo_id_wired,
    status: item.request_status,
  };
};

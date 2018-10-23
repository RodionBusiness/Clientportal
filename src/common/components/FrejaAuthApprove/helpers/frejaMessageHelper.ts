import { FrejaSignModel } from '@common/components/FrejaAuthApprove/models/FrejaSignModel';
import { TBankAccountType } from '@appl/components/ApplAddBankAccount';

export function getDepositSigningMessage() {
  return new FrejaSignModel(`Generate Deposit Reference`, '');
}

export function getWithdrawalSigningMessage(amount: number, iban: string, ccy: string) {
  return new FrejaSignModel(
    'Request Withdrawal',
    `\nIBAN: ${iban} \nCCY: ${ccy} \nAmount: ${amount}`
  );
}

export function getDPSigningMessage() {
  return new FrejaSignModel(`Dealing Participant Application`, '');
}

export function getAddBASigningMessage(type: TBankAccountType, value: string) {
  let message: string = '';

  switch (type) {
    case TBankAccountType.iban:
      message = `IBAN: ${value}`;
      break;

    case TBankAccountType.swift:
      message = `BIC/Swift: ${value}`;
      break;
  }
  return new FrejaSignModel(`Add Bank Account`, message);
}

export function getNewTickerSigningMessage() {
  return new FrejaSignModel(`Submit Support Ticket`);
}

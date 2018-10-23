import { TExternalAccount } from '@appl/components/ApplWithdraw';

export const isNotBlankAccount = (account: TExternalAccount): boolean =>
  account.accountNo != null && account.label != null;

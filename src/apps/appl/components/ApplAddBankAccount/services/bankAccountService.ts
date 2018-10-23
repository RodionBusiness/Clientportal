import {
  bankAccountMapFrom,
  bankAccountMapTo,
  IBankAccountInfo,
  IBankServiceGetBankInfoData,
  TBankInfo,
} from '@appl/components/ApplAddBankAccount';
import { BSWebSocket } from '@common/core/services';
import { IDocument } from '@common/core/types';

interface IBankAccountServiceAdd {
  error: string;
  status: 'saved' | 'not saved';
}

export const bankAccountServiceGetBankInfo = async (iban: string): Promise<TBankInfo> => {
  const data = await BSWebSocket.invoke<IBankServiceGetBankInfoData>(
    'client_registration_service',
    'verify_iban_number',
    { check_num: iban },
  );

  if (!data) {
    throw new Error('A bank was not found that matched the IBAN number');
  }

  if (data.errors && data.errors.length > 0) {
    throw new Error(data.errors[0].message);
  }

  const bankAccount = bankAccountMapFrom(data);
  bankAccount.iban = iban;

  return bankAccount;
};

export const bankAccountServiceAdd = async (
  accountInfo: IBankAccountInfo,
  proofDoc: IDocument,
  bankInfo: TBankInfo | null,
): Promise<IBankAccountServiceAdd> => {
  const data = bankAccountMapTo(accountInfo, proofDoc, bankInfo);

  const response = await BSWebSocket.invoke<IBankAccountServiceAdd>(
    'client_registration_service',
    'save_client_new_ext_account',
    data,
  );

  if (response.error) {
    throw new Error(response.error);
  }

  return response;
};

import { BSWebSocket } from '@common/core/services';
import { mapRegistrationDataTo } from '@onboarding/core/mappers';
import { IAccountState, IRegistrationData, IRegistrationDetails } from '@onboarding/core/types';

const dummyRegistrationData: IRegistrationDetails = {
  submitted: false,
  registration_fee_paid: false,
  account_info: {},
  account_addr: {},
  contact_info: {},
  contact_cash: null,
  contact_addr: {},
  cp_info: {},
  docs: {},
  entity_info: null,
  entity: null,
  entity_addr: null,
  entity_cash: null,
  doc_ent: {},
  wallet_info: {},
};

export async function submitKYCData(
  { type, email, details = dummyRegistrationData }: IAccountState,
  registrationData: IRegistrationData,
): Promise<void> {
  const { status } = await BSWebSocket.invoke<any>(
    'client_registration_service',
    'kyc_save',
    mapRegistrationDataTo(type, registrationData, details),
  );
  if (status !== 'saved') {
    throw new Error('KYC data was not saved.');
  } else {
    window.sessionStorage.removeItem(email);
  }
}

import { Dispatch } from 'redux';

import { showAlertNotification, showInfoNotification } from '@common/core/actions';
import { BSWebSocket, IWSMessage, SERVICE_SIGNALS } from '@common/core/services';
import { TDispatchAction } from '@common/core/types';
import {
  accountDataLoaded,
  initializeRegistration,
  restoreRegistrationData,
  saveStepDataPersistent,
} from '@onboarding/core/actions';
import { mapRegistrationDataFrom, onboardingInitializationMapper } from '@onboarding/core/mappers';
import { getPersistentSessionData } from '@onboarding/core/services';
import { IOnboardingStore, IRegistrationDetails, TDocFile, IRegistrationData } from '@onboarding/core/types';
import { mergeDeep } from '@common/core/helpers/objectHelper';

const CLEARING_WS_URI = String(process.env.CLEARING_WS_URI || '');
const CLEARING_WS_PORT = String(process.env.CLEARINCLEARING_WS_PORTG_WS_URI || '');

export const fetchOnboardingData = (): TDispatchAction<IOnboardingStore> => async (
  dispatch: Dispatch<any>,
  getStore,
) => {
  try {
    dispatch(showInfoNotification({
      message: 'Connecting to server...',
      delay: 2000,
    }));

    const reloginCallback = (message: IWSMessage) => {
      dispatch(showAlertNotification({ message: message.error || 'Need to relogin' }));
      window.setTimeout(() => window.location.href = '/login?action=logout', 1000);
    };

    await BSWebSocket.init(BSWebSocket.buildUrl(CLEARING_WS_URI, CLEARING_WS_PORT));
    BSWebSocket.on(SERVICE_SIGNALS.SESSION_ERROR, reloginCallback);
    BSWebSocket.on(SERVICE_SIGNALS.SESSION_EXPIRED, reloginCallback);

    const details = await BSWebSocket.invoke<IRegistrationDetails>(
      'client_control',
      'get_registration_details',
    );

    if (details.docs.id_2 == null) {
      details.docs.id_2 = (
        await BSWebSocket.invoke<TDocFile[]>(
          'client_registration_service',
          'add_new_file_name_for_collected_docs',
          onboardingInitializationMapper.mapToNewFilePayload('id_2'),
        )
      )[0];
    }

    dispatch(accountDataLoaded(details));

    const storedRegistrationData = getPersistentSessionData(getStore().account);
    const registrationData = mapRegistrationDataFrom(details);

    if (storedRegistrationData || registrationData) {
      const mergedData = mergeDeep(registrationData || {}, storedRegistrationData);
      dispatch(restoreRegistrationData(mergedData as IRegistrationData));
    }
    if (storedRegistrationData == null && window.location.pathname === '/onboarding/continue') {
      window.location.href = '/onboarding';
    }
    if (storedRegistrationData != null && window.location.pathname === '/onboarding/continue') {
      const urlParams = new URLSearchParams(window.location.search);
      const orderReference = urlParams.get('order-reference');
      if (orderReference) {
        await dispatch(saveStepDataPersistent('payment', { orderReference }));
        window.history.replaceState({}, document.title, '/onboarding/continue');
      }
    }

    dispatch(initializeRegistration());

    dispatch(showInfoNotification({
      message: 'Connected to server',
      delay: 2000,
    }));
  } catch (error) {
    console.error('fetchOnboardingData() error:', error);
    dispatch(showAlertNotification({ message: error }));
  }
};

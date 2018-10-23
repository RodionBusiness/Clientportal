import { TDispatchAction } from '@common/core/types';
import { savePersistentSessionData } from '@onboarding/core/services';
import {
  IOnboardingStore,
  IRegistrationData,
  TRegistrationDataSection,
} from '@onboarding/core/types';

export const REGISTRATION_DATA_ACTIONS = {
  SAVE_STEP: 'SAVE_REGISTRATION_DATA_STEP',
  SAVE_SESSION: 'SAVE_REGISTARTION_DATA_SESSION',
  RESTORE_REGISTRATION_DATA: 'RESTORE_REGISTRATION_DATA',
};

export const saveStepDataPersistent = (
  section: keyof IRegistrationData,
  data: TRegistrationDataSection,
): TDispatchAction<IOnboardingStore> => async (dispatch, getState) => {
  await dispatch({
    type: REGISTRATION_DATA_ACTIONS.SAVE_STEP,
    payload: { section, data },
  });
  savePersistentSessionData(getState().account, getState().registrationData);
};

export const saveDataPersistent = (): TDispatchAction<IOnboardingStore> => (_, getState) => {
  savePersistentSessionData(getState().account, getState().registrationData);
};

export const restoreRegistrationData = (
  data: IRegistrationData,
): TDispatchAction => dispatch => dispatch({
  type: REGISTRATION_DATA_ACTIONS.RESTORE_REGISTRATION_DATA,
  payload: { data },
});

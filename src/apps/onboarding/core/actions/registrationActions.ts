import { showAlertNotification } from '@common/core/actions';
import { TDispatchAction } from '@common/core/types';
import { accountSubmitKYC } from '@onboarding/core/actions';
import { clearPersistentSessionData, submitKYCData } from '@onboarding/core/services';
import { IOnboardingStore } from '@onboarding/core/types';
import { EOnboardingStep } from '@onboarding/Main/enums';

export const REGISTRATION_ACTIONS = {
  INITIALIZE: 'INITIALIZE_REGISTRATION',
  SET_STEP: 'REGISTRATION_SET_STEP',
  DATA_SUBMIT_PROCESSSING: 'REGISTRATION_DATA_PROCESSING',
  DATA_SUBMIT_PROCESSSED: 'REGISTRATION_DATA_PROCESSED',
};

const LOGOUT_AFTER_SET_COMPLETE_DELAY = 20000;

export const initializeRegistration = (): TDispatchAction<IOnboardingStore> =>
  (dispatch, getState) => dispatch({
    type: REGISTRATION_ACTIONS.INITIALIZE,
    payload: {
      isSubmitted: getState().account.isSubmitted,
      type: getState().account.type,
      orderReference: getState().registrationData.payment.orderReference,
    },
  });

export const setProgressStep = (stepId: EOnboardingStep): TDispatchAction<IOnboardingStore> =>
  dispatch => dispatch({
    type: REGISTRATION_ACTIONS.SET_STEP,
    payload: stepId,
  });

const registrationSubmitProcessing = (): TDispatchAction =>
  dispatch => dispatch({
    type: REGISTRATION_ACTIONS.DATA_SUBMIT_PROCESSSING,
  });

const registrationSubmitProcessed = (): TDispatchAction =>
  dispatch => dispatch({
    type: REGISTRATION_ACTIONS.DATA_SUBMIT_PROCESSSED,
  });

export const submitRegistrationData = (): TDispatchAction<IOnboardingStore> =>
  async (dispatch, getState) => {
    dispatch(registrationSubmitProcessing());
    try {
      const { registrationData, account } = getState();
      await submitKYCData(account, registrationData);
      await dispatch(accountSubmitKYC());
      clearPersistentSessionData(account);
      window.setTimeout(logout, LOGOUT_AFTER_SET_COMPLETE_DELAY);
    } catch (error) {
      console.error('Error:', error);
      showAlertNotification({
        message: `Error caused due to KYC info send: ${error}`,
      });
    }
    dispatch(registrationSubmitProcessed());
  };

export const logout = () => (window.location.href = '/login?action=logout');

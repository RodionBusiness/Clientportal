import { TDispatchAction } from '@common/core/types';
import { IRegistrationDetails } from '@onboarding/core/types';

export const ACCOUNT_ACTIONS = {
  LOADED: 'ACCOUNT_DATA_LOADED',
  SUBMIT_KYC: 'ACCOUNT_SUBMIT_KYC',
};

export const accountDataLoaded = (details: IRegistrationDetails): TDispatchAction =>
  (dispatch) => {
    dispatch({
      type: ACCOUNT_ACTIONS.LOADED,
      payload: { details },
    });
  };

export const accountSubmitKYC = (): TDispatchAction =>
  dispatch => dispatch({
    type: ACCOUNT_ACTIONS.SUBMIT_KYC,
  });

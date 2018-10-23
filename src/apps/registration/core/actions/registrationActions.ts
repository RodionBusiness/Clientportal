import { History } from 'history';
import { Dispatch } from 'react-redux';

import { showAlertNotification } from '@common/core/actions';
import { RegistrationAPI } from '@registration/core/api/registrationAPI';
import { RegistrationMapper } from '@registration/core/mappers/registrationMapper';
import { FrejaRegistrationService } from '@common/components/FrejaAuthApprove/services/FrejaRegistrationService';

export const REGISTRATION_FORM_ACTIONS = {
  SUBMIT: 'REGISTRATION_SUBMIT',
  SUBMIT_ERROR: 'REGISTRATION_SUBMIT_ERROR',
  SUBMIT_SUCCESS: 'REGISTRATION_SUBMIT_SUCCESS',
  RESET: 'REGISTRATION_RESET'
};

interface IRegistrationCredentials {
  accountType: string;
  certification: boolean;
  companyName?: string;
  email: string;
  firstName: string;
  lastName: string;
}
export const navigateToLoginPage = (history: History) => async (dispatch: Dispatch<any>) => {
  history.push('/pub-login');
  dispatch({ type: REGISTRATION_FORM_ACTIONS.RESET });
};

export const submit = (values: IRegistrationCredentials) => async (dispatch: Dispatch<any>) => {
  dispatch({ type: REGISTRATION_FORM_ACTIONS.SUBMIT });

  try {
    const regData = RegistrationMapper.to(values);
    const ref = await RegistrationAPI.register(regData);
    await FrejaRegistrationService.checkResult(ref, regData);

    dispatch({
      type: REGISTRATION_FORM_ACTIONS.SUBMIT_SUCCESS
    });
  } catch (errorPayload) {
    const error: Error = errorPayload;

    dispatch({
      type: REGISTRATION_FORM_ACTIONS.SUBMIT_ERROR,
      payload: { error: error.message }
    });

    dispatch(showAlertNotification({ message: error.message }));

    // throw error;
  }
};

export const cancel = () => async (dispatch: Dispatch<any>) => {
  dispatch({ type: REGISTRATION_FORM_ACTIONS.RESET });
};

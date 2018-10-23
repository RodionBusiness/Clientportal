import { showAlertNotification } from '@common/core/actions/notificationsActions';
import { Dispatch } from 'redux';
import { LoginAPI } from '@login/core/api/loginAPI';
import { ILoginModel } from '@login/core/models/ILoginModel';
import { FrejaAuthService } from '@common/components/FrejaAuthApprove/services/FrejaAuthService';

export const LOGIN_ACTIONS = {
  SUBMIT: 'LOGIN_SUBMIT',
  SUBMIT_ERROR: 'LOGIN_SUBMIT_ERROR',
  SUBMIT_SUCCESS: 'LOGIN_SUBMIT_SUCCESS',
  RESET: 'LOGIN_RESET'
};

export const submit = (loginModel: ILoginModel) => async (dispatch: Dispatch<any>) => {
  dispatch({ type: LOGIN_ACTIONS.SUBMIT });

  try {
    const ref = await LoginAPI.login(loginModel.email);
    await FrejaAuthService.checkResult(ref);

    dispatch({
      type: LOGIN_ACTIONS.SUBMIT_SUCCESS
    });

    window.location.href = '/appl';
  } catch (errorPayload) {
    const error: Error = errorPayload;

    dispatch({
      type: LOGIN_ACTIONS.SUBMIT_ERROR,
      payload: { error: error.message }
    });

    dispatch(showAlertNotification({ message: error.message }));
  }
};

export const reset = () => async (dispatch: Dispatch<any>) => {
  dispatch({ type: LOGIN_ACTIONS.RESET });
};

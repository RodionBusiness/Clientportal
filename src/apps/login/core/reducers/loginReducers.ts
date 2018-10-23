import { AnyAction } from 'redux';
import { LOGIN_ACTIONS } from '@login/core/actions/loginActions';

export interface ILoginState {
  sending: boolean;
  errorMessage?: string;
  isSent?: boolean;
  successMessage?: string;
}

const initialState = {
  sending: false,
  errorMessage: '',
  isSent: false,
  successMessage: ''
};

export const loginReducer = (
  state: ILoginState = initialState,
  { type, payload }: AnyAction
): ILoginState => {
  switch (type) {
    case LOGIN_ACTIONS.SUBMIT:
      return {
        ...state,
        sending: true,
        errorMessage: ''
      };

    case LOGIN_ACTIONS.SUBMIT_ERROR:
      return {
        ...state,
        sending: false,
        errorMessage: payload.error
      };

    case LOGIN_ACTIONS.SUBMIT_SUCCESS:
      return {
        ...state,
        sending: false,
        isSent: true,
        errorMessage: ''
      };

    case LOGIN_ACTIONS.RESET:
      return {
        ...initialState
      };

    default:
      return {
        ...state
      };
  }
};

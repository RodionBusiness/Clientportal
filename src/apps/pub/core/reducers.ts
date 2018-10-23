import { combineReducers, Reducer } from 'redux';

import { notificationsReducer } from '@common/core/reducers';
import { forgotPasswordFormReducer } from '@forgot-password/core/reducers';
import { IPubState } from '@pub/core/types';
import { registrationFormReducer } from '@registration/core/reducers';
import { loginReducer } from '@login/core/reducers/loginReducers';

type TCommonReducers = Reducer<IPubState>;

export const reducers: TCommonReducers = combineReducers<IPubState>({
  notifications: notificationsReducer,
  forgotPasswordForm: forgotPasswordFormReducer,
  registrationForm: registrationFormReducer,
  loginState: loginReducer
});

import { TNotifications } from '@common/core/types';
import { IForgotPasswordState } from '@forgot-password/core/types';
import { IRegistrationFormState } from '@registration/core/types';
import { ILoginState } from '@login/core/reducers/loginReducers';

export interface IPubState {
  notifications: TNotifications;
  forgotPasswordForm: IForgotPasswordState;
  registrationForm: IRegistrationFormState;
  loginState: ILoginState
}

import { TNotifications } from '@common/core/types';
import {
  IAccountState,
  IRegistrationData,
  IRegistrationState,
} from '@onboarding/core/types';

export interface IOnboardingStore {
  account: IAccountState;
  registration: IRegistrationState;
  registrationData: IRegistrationData;
  notifications: TNotifications;
}

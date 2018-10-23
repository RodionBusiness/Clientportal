import { combineReducers } from 'redux';

import { notificationsReducer } from '@common/core/reducers';
import { accountReducer } from '@onboarding/core/reducers/accountReducer';
import { registrationDataReducer } from '@onboarding/core/reducers/registrationDataReducer';
import { registrationReducer } from '@onboarding/core/reducers/registrationReducer';
import { IOnboardingStore } from '@onboarding/core/types';

export const reducers = combineReducers<IOnboardingStore>({
  account: accountReducer,
  registration: registrationReducer,
  registrationData: registrationDataReducer,
  notifications: notificationsReducer,
});

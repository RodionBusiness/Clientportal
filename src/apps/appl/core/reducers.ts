import { combineReducers } from 'redux';

import { initializationReducer } from '@appl/core/reducers/initializationReducer';
import { userReducer } from '@appl/core/reducers/userReducer';

import { IApplState } from '@appl/core/types';
import { notificationsReducer } from '@common/core/reducers/notificationsReducer';

export const reducers = combineReducers<IApplState>({
  user: userReducer,
  notifications: notificationsReducer,
  initialization: initializationReducer,
});

import { applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';

import { reducers } from '@onboarding/core/reducers';
import { IOnboardingStore } from '@onboarding/core/types';

export const store: Store<IOnboardingStore> = createStore(
  reducers,
  applyMiddleware(thunk),
);

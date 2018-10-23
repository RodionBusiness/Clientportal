import { applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';

import { reducers } from '@appl/core/reducers';
import { IApplState } from '@appl/core/types';

export const store: Store<IApplState> = createStore(
  reducers,
  applyMiddleware(thunk),
);

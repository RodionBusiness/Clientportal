import { AnyAction } from 'redux';

import { USER_ACTIONS } from '@appl/core/actions';
import { IUserState } from '@appl/core/types';

const initialState: IUserState = {
  enabled: false,
  fullname: '',
  roles: [],
  documentEnabled: false,
  transactionEnabled: false,
  userEmail: '',
  userId: -1,
};

export const userReducer = (
  state: IUserState = { ...initialState },
  { type, payload }: AnyAction,
): IUserState => {
  switch (type) {
    case USER_ACTIONS.LOADED: return {
      ...payload.clientUserEnabled,
      documentEnabled: payload.clientUserEnabled.document_enabled,
      transactionEnabled: payload.clientUserEnabled.transaction_enabled,
      userEmail: payload.clientUserEnabled.client_email,
      userId: payload.clientUserEnabled.client_person_id,
    };

    default: return state;
  }
};

import { AnyAction } from 'redux';

import { REGISTRATION_DATA_ACTIONS } from '@onboarding/core/actions';
import { IRegistrationData } from '@onboarding/core/types';

const initialState: IRegistrationData = {
  contacts: {},
  polling: {},
  files: {},
  filesInfo: {},
  filesRepresentative: {},
  filesMembers: { corporateMembersSecondOmitted: true },
  filesOwners: {},
  payment: {},
};

export const registrationDataReducer = (
  state: IRegistrationData = {
    contacts: { ...initialState.contacts },
    polling: { ...initialState.polling },
    files: { ...initialState.files },
    filesInfo: { ...initialState.filesInfo },
    filesRepresentative: { ...initialState.filesRepresentative },
    filesMembers: { ...initialState.filesMembers },
    filesOwners: { ...initialState.filesOwners },
    payment: { ...initialState.payment },
  },
  { type, payload }: AnyAction,
) => {
  switch (type) {
    case REGISTRATION_DATA_ACTIONS.SAVE_STEP: {
      return { ...state, [payload.section]: payload.data };
    }
    case REGISTRATION_DATA_ACTIONS.RESTORE_REGISTRATION_DATA: {
      return { ...state, ...payload.data };
    }
    default: return state;
  }
};

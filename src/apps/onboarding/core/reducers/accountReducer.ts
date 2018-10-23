import { AnyAction } from 'redux';

import { ACCOUNT_ACTIONS } from '@onboarding/core/actions';
import { EOnboardingAccountType } from '@onboarding/core/enums';
import { onboardingAccountMapper } from '@onboarding/core/mappers';
import { IAccountState } from '@onboarding/core/types';

const initialState: IAccountState = {
  type: EOnboardingAccountType.unknown,
  email: '',
  firstname: '',
  lastname: '',
  isApproved: false,
  isSubmitted: false,
};

export const accountReducer = (
  state: IAccountState = { ...initialState },
  { type, payload }: AnyAction,
): IAccountState => {
  switch (type) {
    case ACCOUNT_ACTIONS.LOADED: {
      return onboardingAccountMapper.mapForm(payload.details, state);
    }
    case ACCOUNT_ACTIONS.SUBMIT_KYC: {
      return { ...state, isSubmitted: true };
    }
    default: return state;
  }
};

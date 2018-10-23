import { AnyAction } from 'redux';

import { REGISTRATION_ACTIONS } from '@onboarding/core/actions';
import { EOnboardingAccountType } from '@onboarding/core/enums';
import { IRegistrationState } from '@onboarding/core/types';
import { EOnboardingStep } from '@onboarding/Main/enums';

const { corporate, individual } = EOnboardingAccountType;
const {
  initialization,
  welcomeCorporate,
  welcomeIndividual,
  congratulationsCorporate,
  congratulationsIndividual,
} = EOnboardingStep;

const initialState: IRegistrationState = {
  step: EOnboardingStep.initialization,
  isSubmitting: false,
};

export const registrationReducer = (
  state: IRegistrationState = { ...initialState },
  { type, payload }: AnyAction,
): IRegistrationState => {
  switch (type) {
    case REGISTRATION_ACTIONS.INITIALIZE: {
      let step = initialization;
      if (!payload.isSubmitted && payload.type === corporate) {
        step = welcomeCorporate;
      }
      if (!payload.isSubmitted && payload.type === individual) {
        step = payload.orderReference ? congratulationsIndividual : welcomeIndividual;
      }
      if (payload.isSubmitted && payload.type === corporate) {
        step = congratulationsCorporate;
      }
      if (payload.isSubmitted && payload.type === individual) {
        step = congratulationsIndividual;
      }
      return { ...state, step };
    }
    case REGISTRATION_ACTIONS.SET_STEP: {
      return { ...state, step: payload };
    }
    case REGISTRATION_ACTIONS.DATA_SUBMIT_PROCESSSING: {
      return { ...state, isSubmitting: true };
    }
    case REGISTRATION_ACTIONS.DATA_SUBMIT_PROCESSSED: {
      return { ...state, isSubmitting: false };
    }
    default: return state;
  }
};

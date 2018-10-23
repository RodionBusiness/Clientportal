import { EOnboardingAccountType } from '@onboarding/core/enums';
import { IAccountState, IRegistrationDetails } from '@onboarding/core/types';

const { corporate, individual, unknown } = EOnboardingAccountType;

export const onboardingAccountMapper = {

  mapForm(details: IRegistrationDetails, defaults: IAccountState): IAccountState {
    let accountType = unknown;
    if (details.contact_cash != null) {
      accountType = individual;
    }
    if (details.entity_cash != null) {
      accountType = corporate;
    }
    return {
      details,
      type: accountType,
      email: details.cp_info.email || defaults.email,
      firstname: details.cp_info.firstname || defaults.firstname,
      lastname: details.cp_info.lastname || defaults.lastname,
      isSubmitted: details.submitted,
      isApproved: defaults.isApproved,
    };
  },

};

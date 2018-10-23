import { EOnboardingAccountType } from '@onboarding/core/enums';
import { IRegistrationDetails } from '@onboarding/core/types';

export interface IAccountState {
  type: EOnboardingAccountType;
  email: string;
  firstname: string;
  lastname: string;
  isApproved: boolean;
  isSubmitted: boolean;
  details?: IRegistrationDetails;
  rememberEmail?:boolean;
  loginEmail?:string;
}

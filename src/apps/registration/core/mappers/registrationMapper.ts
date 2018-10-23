import { IRegistrationModel } from '@registration/core/models/RegistrationModel';

const to = (model: IRegistrationModel): object => {
  return {
    account_type: model.accountType,
    certification: model.certification,
    company_name: model.companyName,
    email: model.email,
    firstname: model.firstName,
    lastname: model.lastName,
  };
};

export const RegistrationMapper = {
  to
}
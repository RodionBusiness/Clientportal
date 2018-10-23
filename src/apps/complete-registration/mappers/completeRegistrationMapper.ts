export type TCompleteRegistrationData = {
  hash: string;
  email: string;
};

interface ICompleteRegistrationData {
  pwd_hash: string;
  pwd_email: string;
}

export const completeRegistrationMapTo = (
  data: TCompleteRegistrationData
): ICompleteRegistrationData => {
  return {
    pwd_hash: data.hash,
    pwd_email: data.email,
  };
};

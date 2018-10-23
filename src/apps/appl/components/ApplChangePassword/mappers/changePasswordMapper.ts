export type TChangePasswordData = {
  userId: number,
  oldPassword: string,
  password: string,
  passwordConfirmation: string,
};

// tslint:disable-next-line:export-name
export const changePasswordMapTo = (data: TChangePasswordData) => {
  return {
    pk_id: data.userId,
    old: data.oldPassword,
    new_pass: data.password,
    pass_again: data.passwordConfirmation,
  };
};

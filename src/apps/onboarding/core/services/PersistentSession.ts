// tslint:disable no-console
import { IAccountState, IRegistrationData } from '@onboarding/core/types';

export function savePersistentSessionData(account: IAccountState, data: IRegistrationData): void {
  try {
    window.sessionStorage.setItem(account.email, JSON.stringify(data));
  } catch (err) {
    console.warn('There is error when trying to save session data:', err);
  }
}

export function getPersistentSessionData(account: IAccountState): IRegistrationData | undefined {
  const data = window.sessionStorage.getItem(account.email);
  try {
    return data && JSON.parse(data) || null;
  } catch (err) {
    console.warn('There is error when trying to restore session data:', err);
  }
  return;
}

export function clearPersistentSessionData(account: IAccountState): void {
  window.sessionStorage.removeItem(account.email);
}

// tslint:disable no-console
interface ILoginPersistentStorageData {
  email: string;
  remember: boolean;
}

const PS_ID = 'BS_LOGIN';

export function savePersistentSessionData(data: ILoginPersistentStorageData): void {
  try {
    window.sessionStorage.setItem(PS_ID, JSON.stringify(data));
  } catch (err) {
    console.warn('There is error when trying to save session data:', err);
  }
}

export function getPersistentSessionData(): ILoginPersistentStorageData {
  const data = window.sessionStorage.getItem(PS_ID);
  let storageData = undefined;

  try {
    storageData = data && JSON.parse(data);
  } catch (err) {
    console.warn('There is error when trying to restore session data:', err);
  }

  return{
    email: storageData ? storageData.email : '',
    remember: storageData ? storageData.remember : false
  }
}

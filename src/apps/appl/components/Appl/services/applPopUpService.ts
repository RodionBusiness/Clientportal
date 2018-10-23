import { IApplPopupAPI } from '@appl/components/Appl/ApplPopup';

export enum AppPopUpEnum {
  FrejaApprove = 'FREJA_APPROVE'
}

interface IPopUpDictionary {
  [popUpName: string]: IApplPopupAPI;
}

class ApplPopUpServiceClass {
  private popUps: IPopUpDictionary = {};

  public register(name: AppPopUpEnum, api: IApplPopupAPI) {
    this.popUps[name] = api;
  }

  public getAPI(name: AppPopUpEnum): IApplPopupAPI | null {
    return this.popUps[name] ? this.popUps[name] : null;
  }
}

export const ApplPopUpService = new ApplPopUpServiceClass();

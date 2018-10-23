import { ApplPopUpService, AppPopUpEnum } from '@appl/components/Appl/services/applPopUpService';
import { BSWebSocket } from '@common/core/services';
import {
  FrejaSignModel,
  IFrejaSignRequestData,
  IFrejaSignResultData
} from '@common/components/FrejaAuthApprove/models/FrejaSignModel';
import { RetryService, IRetryResult } from '@common/core/services/RetryService';

class FrejaSign {
  private lastRef?: string;
  private inProgress: boolean = false;

  public async sign(model: FrejaSignModel) {
    this.inProgress = true;

    const frejaPopUpAPI = ApplPopUpService.getAPI(AppPopUpEnum.FrejaApprove);

    if (!frejaPopUpAPI) {
      throw new Error('Freja popup is not declared');
    }

    frejaPopUpAPI.show(null, this.popupClosed);

    try {
      await this.signRequest(model);
    } finally {
      this.inProgress = false;
      frejaPopUpAPI.hide();
    }
  }

  private async signRequest(model: FrejaSignModel): Promise<{}> {
    const result = await BSWebSocket.invoke<IFrejaSignRequestData>(
      'client_freja_service',
      'sign_user_action',
      {
        signing_text: model.message,
        signing_title: model.title
      }
    );

    this.lastRef = result.sign_ref;

    if (!this.lastRef || this.lastRef === '') {
      throw new Error('Internal Error: Empty ref');
    }

    const status: IRetryResult<IFrejaSignResultData> = await RetryService.start(this.checkRequest);

    // Canceled using cancel() method
    if (status.status === 'canceled') {
      throw new Error('Sign request was canceled');
    }

    return result;
  }

  popupClosed = (): void => {
    if (this.inProgress) {
      RetryService.cancel();

      try {
        BSWebSocket.invoke<IFrejaSignResultData>(
          'client_freja_service',
          'cancel_user_action_sign',
          {
            sign_ref: this.lastRef
          }
        );
      } catch (e) {}
    }
  };

  checkRequest = async (): Promise<any> => {
    const result = await BSWebSocket.invoke<IFrejaSignResultData>(
      'client_freja_service',
      'get_user_action_sign_status',
      {
        sign_ref: this.lastRef
      }
    );

    if (result.status === 'CANCELED') {
      throw new Error('Sign request was canceled');
    }

    if (result.status === 'EXPIRED') {
      throw new Error('Signing session was expired');
    }

    if (result.status === 'APPROVED') {
      return result;
    }

    return null;
  };
}

export const FrejaSignService = new FrejaSign();

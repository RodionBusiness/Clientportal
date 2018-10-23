import { IRetryResult, RetryService } from '@common/core/services/RetryService';
import { FrejaStatuses } from '@common/components/FrejaAuthApprove/models/FrejaSignModel';
import { frejaHttpAPI } from '@common/components/FrejaAuthApprove/api/frejaAPI';

class FrejaRegistration {
  private lastRef?: string;
  private regData?: object;

  public async checkResult(ref: string, regData: object) {
    this.lastRef = ref;
    this.regData = regData;

    const status: IRetryResult<FrejaStatuses> = await RetryService.start(this.checkRequest);

    if (status.status === 'canceled') {
      throw new Error('Sign request was canceled');
    }
  }

  public cancel() {
    frejaHttpAPI.cancelRegistrationCheck(this.lastRef!);
  }

  checkRequest = async (): Promise<any> => {
    const status: FrejaStatuses = await frejaHttpAPI.checkRegistrationResult(
      this.lastRef!,
      this.regData!
    );

    if (status === 'CANCELED' || status === 'RP_CANCELED') {
      throw new Error('Registration request was canceled');
    }

    if (status === 'EXPIRED') {
      throw new Error('Registration session was expired');
    }

    if (status === 'APPROVED') {
      return status;
    }

    return null;
  };
}

export const FrejaRegistrationService = new FrejaRegistration();

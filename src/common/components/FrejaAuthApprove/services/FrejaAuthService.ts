import { IRetryResult, RetryService } from '@common/core/services/RetryService';
import { FrejaStatuses } from '@common/components/FrejaAuthApprove/models/FrejaSignModel';
import { frejaHttpAPI } from '@common/components/FrejaAuthApprove/api/frejaAPI';

class FrejaAuth {
  private lastRef?: string;

  public async checkResult(ref: string) {
    this.lastRef = ref;
    const status: IRetryResult<FrejaStatuses> = await RetryService.start(this.checkRequest);

    if (status.status === 'canceled') {
      throw new Error('Sign request was canceled');
    }
  }

  public cancel() {
    frejaHttpAPI.cancelAuthCheck(this.lastRef!);
  }
  
  checkRequest = async (): Promise<any> => {
    const status: FrejaStatuses = await frejaHttpAPI.checkResult(this.lastRef!);

    if (status === 'CANCELED' || status === 'RP_CANCELED') {
      throw new Error('Auth request was canceled');
    }

    if (status === 'EXPIRED') {
      throw new Error('Auth session was expired');
    }

    if (status === 'APPROVED') {
      return status;
    }

    return null;
  };
}

export const FrejaAuthService = new FrejaAuth();

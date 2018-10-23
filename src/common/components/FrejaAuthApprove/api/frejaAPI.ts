import { WebServer, getCookie } from '@common/core/services';
import { FrejaStatuses } from '@common/components/FrejaAuthApprove/models/FrejaSignModel';
import { AxiosResponse } from 'axios';

export interface IFrejaHTTPAuthCheckResultData {
  error: string;
  result: {
    status: FrejaStatuses;
  };
}

const processCheckResult = (data: AxiosResponse<IFrejaHTTPAuthCheckResultData>) => {
  if (data.data.error) {
    throw new Error(data.data.error);
  }

  if (data.data.result.status) {
    return data.data.result.status;
  }

  throw new Error('Unexpected error. Empty status');
}

const processVoidResult = (data: AxiosResponse<any>) => {
  if (data.data.error) {
    throw new Error(data.data.error);
  }

  if (data.data.result) {
    return ;
  }

  throw new Error('Unknown error');
}

const checkResult = async (ref: string): Promise<FrejaStatuses> => {
  const status = await WebServer.post<IFrejaHTTPAuthCheckResultData>(
    `/auth`,
    {
      auth_ref: ref,
      action: 'get_auth_status'
    },
    {
      headers: { 'X-Xsrftoken': getCookie('_xsrf') }
    }
  ).then(processCheckResult);

  return status;
};

const checkRegistrationResult = async (ref: string, regData: object): Promise<FrejaStatuses> => {
  const status = await WebServer.post<IFrejaHTTPAuthCheckResultData>(
    `/auth`,
    {
      reg_data: regData,
      auth_ref: ref,
      action: 'complete_reg'
    },
    {
      headers: { 'X-Xsrftoken': getCookie('_xsrf') }
    }
  ).then(processCheckResult);

  return status;
}

const cancelAuthCheck = async (ref: string): Promise<void> => {
  return WebServer.post<any>(
    `/auth`,
    {
      auth_ref: ref,
      action: 'cancel_auth'
    },
    {
      headers: { 'X-Xsrftoken': getCookie('_xsrf') }
    }
  ).then(processVoidResult);
};

const cancelRegistrationCheck = async (ref: string): Promise<void> => {
  return WebServer.post<any>(
    `/auth`,
    {
      auth_ref: ref,
      action: 'cancel_reg'
    },
    {
      headers: { 'X-Xsrftoken': getCookie('_xsrf') }
    }
  ).then(processVoidResult);
};

export const frejaHttpAPI = {
  checkResult,
  cancelAuthCheck,
  cancelRegistrationCheck,
  checkRegistrationResult
};

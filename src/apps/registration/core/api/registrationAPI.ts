import { WebServer, getCookie } from '@common/core/services';

interface IRegisterData {
  result: {
    auth_ref: string;
    error: any;
  };
  error: string;
}

const register = (data: any): Promise<string> => {
  return WebServer.post<IRegisterData>('/registration', data, {
    headers: { 'X-Xsrftoken': getCookie('_xsrf') },
    timeout: 2 * 60 * 1000
  }).then(data => {
    if (data.data.error) {
      throw new Error(data.data.error);
    }

    if (data.data.result.error) {
      const error = data.data.result.error;
      let message = null;
      message = Array.isArray(error) && error.length > 0 ? error[0] : null;
      message = error ? error : 'Unknown error';
      throw new Error(message);
    }
    if (data.data.result.auth_ref) {
      return data.data.result.auth_ref;
    }

    throw new Error('Unexpected error. Empty ref');
  });
};

export const RegistrationAPI = {
  register
};

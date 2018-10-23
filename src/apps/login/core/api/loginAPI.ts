import { WebServer, getCookie } from '@common/core/services';

interface ILoginData {
  error: string;
  result: {
    auth_ref: string;
  }
}

const login = (email: string): Promise<string> => {
  return WebServer.post<ILoginData>(
    '/loginj',
    {
      email: email,
      password: ''
    },
    {
      headers: { 'X-Xsrftoken': getCookie('_xsrf') },
      timeout: 2 * 60 * 1000
    }
  ).then(data => {
    if (data.data.error) {
      throw new Error(data.data.error);
    }

    if (data.data.result.auth_ref) {
      return data.data.result.auth_ref;
    }
    else{
      throw new Error('Unexpected error. Empty ref code');
    }

    throw new Error('Unknown error');
  });
};

export const LoginAPI = {
  login
};

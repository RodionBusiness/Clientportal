import { WebServer } from '@common/core/services';

export type TCheckHashResponse = {
  result: 'None' | string;
};

export const checkHash = async (
  hash: string,
  email: string,
): Promise<TCheckHashResponse> => {
  const qs = [
    `hash=${hash}`,
    `email=${email}`,
  ].join('&');
  const { data } = await WebServer.get<TCheckHashResponse>(
    `/hashstatus?${qs}`,
  );

  return Promise.resolve(data);
};

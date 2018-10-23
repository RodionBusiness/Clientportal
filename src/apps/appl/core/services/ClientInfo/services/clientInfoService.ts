import { clientInfoMapFrom, IClientInfoData, TClientInfo } from '@appl/core/services/ClientInfo';
import { BSWebSocket } from '@common/core/services';

// tslint:disable-next-line:export-name
export const clientInfoSrviceGetInfo = async (): Promise<TClientInfo> => {
  const data = await BSWebSocket.invoke<IClientInfoData>(
    'client_control',
    'load_doc_client_info',
    {},
  );

  return clientInfoMapFrom(data);
};

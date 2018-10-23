import { BSWebSocket, SERVICE_SIGNALS } from '@common/core/services';
import { IClientUserEnabled } from '@common/core/types';

const CLEARING_WS_URI = String(process.env.CLEARING_WS_URI || '');
const CLEARING_WS_PORT = String(process.env.CLEARING_WS_PORT || '');

let socketInitiated: boolean;

export const initializeSocket = async () => {
  await BSWebSocket.init(BSWebSocket.buildUrl(CLEARING_WS_URI, CLEARING_WS_PORT));

  socketInitiated = true;

  BSWebSocket.on(SERVICE_SIGNALS.SESSION_ERROR, () => socketInitiated = false);
  BSWebSocket.on(SERVICE_SIGNALS.SESSION_EXPIRED, () => socketInitiated = false);
};

export const clientGetInfo = async (): Promise<IClientUserEnabled> => {
  if (!socketInitiated) {
    await initializeSocket();
  }

  return BSWebSocket.invoke<IClientUserEnabled>(
    'client_control',
    'client_user_enabled',
  );
};

import { BSWebSocket } from '@common/core/services';

// tslint:disable-next-line:export-name
export const entityFilesServiceDelete = async (fileId: number): Promise<string> =>
  BSWebSocket.invoke<string>(
    'client_registration_service',
    'remove_f2e_file',
    { pk: fileId },
  );

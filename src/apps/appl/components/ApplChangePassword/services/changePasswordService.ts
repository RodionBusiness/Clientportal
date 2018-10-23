import { changePasswordMapTo, TChangePasswordData } from '@appl/components/ApplChangePassword/mappers';
import { BSWebSocket } from '@common/core/services';

// tslint:disable-next-line:export-name
export const changePasswordServiceUpdate = async (data: TChangePasswordData): Promise<void> => {
  return BSWebSocket.invoke<void>(
    'client_registration_service',
    'genoa_change_password',
    changePasswordMapTo(data),
  );
};

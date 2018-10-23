import { BSWebSocket } from '@common/core/services';

export const TFAServiceTestCode = async (code: number): Promise<void> => {
  const testResult = await BSWebSocket.invoke<boolean>(
    'client_control',
    'test_two_factor_code',
    { tfc: code },
  );

  if (!testResult) {
    throw new Error('Wrong code');
  }
};

export const TFAServiceToggleState = (): Promise<boolean> => {
  return BSWebSocket.invoke<boolean>(
    'client_registration_service',
    'change_client_tf',
    {},
  );
};

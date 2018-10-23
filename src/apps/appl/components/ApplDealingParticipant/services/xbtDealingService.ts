import { BSWebSocket } from '@common/core/services';

export type TXBTDealingStatus = 'Pending' | 'Open' | 'Closed' | 'Not Applied' | 'Denied' | 'Insufficient Funds';

export interface IXBTDealingServiceApplyResponse {
  success: boolean;
  error: null | {
    message: string;
    code: 10001 | 10002 | 10003 | 10004;
  };
  current_balance: number;
}

export async function xbtDealingServiceGetStatus(): Promise<TXBTDealingStatus | null> {
  return BSWebSocket.invoke<TXBTDealingStatus>(
    'client_control',
    'get_xbt_status',
  );
}

export async function xbtDealingServiceApply(): Promise<IXBTDealingServiceApplyResponse> {
  return BSWebSocket.invoke<IXBTDealingServiceApplyResponse>(
    'client_registration_service',
    'apply_for_xbt_status',
  );
}

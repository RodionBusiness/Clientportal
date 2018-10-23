import { IInitializationState, IUserState } from '@appl/core/types';
import { TNotifications } from '@common/core/types';

export interface IApplState {
  user: IUserState;
  notifications: TNotifications;
  initialization: IInitializationState;
}

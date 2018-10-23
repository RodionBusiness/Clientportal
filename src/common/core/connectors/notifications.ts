import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { showAlertNotification, showInfoNotification } from '@common/core/actions';
import { IPubState } from '@pub/core/types';

export { DEFAULT_ALERT_NOTIFICATION_DELAY, DEFAULT_SUCCESS_NOTIFICATION_DELAY } from '@common/core/actions';

export interface IDispatchNotifyActionsProps {
  notifySuccess(message: string): void;
  notifyError(message: string): void;
}

export const mapDispatchNotifyActions = (
  dispatch: ThunkDispatch<IPubState, never, AnyAction>,
): IDispatchNotifyActionsProps => ({
  notifySuccess(message) {
    dispatch(showInfoNotification({ message }));
  },
  notifyError(message) {
    dispatch(showAlertNotification({ message }));
  },
});

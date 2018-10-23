import { Dispatch } from 'react-redux';

import { IClientUserEnabled } from '@common/core/types';

export const USER_ACTIONS = {
  LOADED: 'USER_LOADED',
};

export const userLoaded = (clientUserEnabled: IClientUserEnabled) =>
  (dispatch: Dispatch<any>) => {
    dispatch({
      type: USER_ACTIONS.LOADED,
      payload: { clientUserEnabled },
    });
  };

import * as React from 'react';
import { Provider } from 'react-redux';

import { store } from '@appl/core/store';

import { ApplRouter } from '@appl/components/ApplRouter';
import { NotificationsHub } from '@common/components/Notifications';

export const ApplApp = () => (
  <Provider store={store}>
    <section className='app__inner'>
      <ApplRouter />
      <NotificationsHub />
    </section>
  </Provider>
);

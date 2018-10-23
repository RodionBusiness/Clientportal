import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { NotificationsHub } from '@common/components/Notifications';
import { store } from '@onboarding/core/store';
import { OnboardingSteps } from '@onboarding/Main/components';

export const OnboardingApp = () => (
  <Provider store={store}>
    <section className='app__inner'>
      <BrowserRouter>
        <Switch>
          <Route path='/onboarding' component={OnboardingSteps}/>
          <Redirect to='/onboarding' />
        </Switch>
      </BrowserRouter>
      <NotificationsHub />
    </section>
  </Provider>
);

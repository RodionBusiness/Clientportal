import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import { store } from '@pub/core/store';

import { NotificationsHub } from '@common/components';
import { CompleteRegistrationApp } from '@complete-registration/components';
import { ForgotPasswordApp } from '@forgot-password/components';
import { ResetPasswordApp } from '@reset-password/components';
import { LoginApp } from '@login/containers/LoginAppContainer';
import { RegistrationApp } from '@registration/containers/RegistrationAppContainer';

export const PubApp = () => (
  <Provider store={store}>
    <section className="app__inner">
      <Router>
        <Switch>
          <Route path="/pub-forgot-password" component={ForgotPasswordApp} />
          <Route path="/pub-reset-password" component={ResetPasswordApp} />
          <Route path="/pub-login" component={LoginApp} />
          <Route path="/pub-registration" component={RegistrationApp} />
          <Route path="/pub-complete-registration" component={CompleteRegistrationApp} />
          <Redirect to="/pub-login" />
        </Switch>
      </Router>
      <NotificationsHub />
    </section>
  </Provider>
);

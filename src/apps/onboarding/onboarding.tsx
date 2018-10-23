import * as React from 'react';
import * as ReactDOM from 'react-dom';

/* tslint:disable:no-import-side-effect */
import 'core-js/shim';

import '@onboarding/Main/values';

import { OnboardingApp } from '@onboarding/Main/components';

ReactDOM.render(
  <OnboardingApp />,
  document.querySelector('#app'),
);

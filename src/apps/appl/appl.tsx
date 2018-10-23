import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { ApplApp } from '@appl/components/ApplApp';

const render = (Component: React.StatelessComponent) => {
  ReactDOM.render(
    <Component />,
    document.querySelector('#app'),
  );
};

render(ApplApp);

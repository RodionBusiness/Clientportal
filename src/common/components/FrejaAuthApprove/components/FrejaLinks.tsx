import * as React from 'react';
import { BSAppStoreButton } from '@common/components/BS/BSAppStoreButton';
import { BSPlayMarketButton } from '@common/components/BS/BSPlayMarketButton';

export const FrejaLinks = () => (
  <div>
    <hr />
    <h3>Don’t have Freja eID? </h3>
    <p>
      To activate{' '}
      <a href="https://frejaeid.com/" target="_blank">
        Freja eID
      </a>, just install the app on your mobile, register and you are done.
    </p>
    <p>
      <BSAppStoreButton />
      <BSPlayMarketButton className="ml-2" />
    </p>
  </div>
);

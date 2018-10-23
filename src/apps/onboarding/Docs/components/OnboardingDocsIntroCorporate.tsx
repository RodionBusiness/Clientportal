import React from 'react';

import { BSFormGroup } from '@common/components';
import { upalodIconSrc } from '@onboarding/Docs/values';

export const OnboardingDocsIntroCorporate: React.StatelessComponent = () => (
  <BSFormGroup className='text-center'>
    <div className='helper__mb--1rem'>
      <img alt='upload' src={upalodIconSrc} />
    </div>
    <h3 className='helper__semibold'>
      Please upload
      <br />
      identification documents
    </h3>
    <p className='text-muted'>
      <small>
        Only PDF, JPEG of PNG files can be uploaded
      </small>
    </p>
    <ol className='text-left mb-4'>
      <li>Certificate of Registration</li>
      <li>Register of Directors and Register of Shareholders</li>
      <li>
        Company Proof of Address (utility bill, bank statement or other,
        no more than 3 months old)
      </li>
      <li>
        The representative of the account shall submit a passport copy and
        proof of residency
      </li>
      <li>Passport copy and proof of residency for at least two board members</li>
      <li>Beneficial owner(s)</li>
    </ol>
    <p className='text-left mb-4'>
      Passport copies and proof of residency for shareholders* holding at least
      25 percent, or more, of shares or voting rights through direct or indirect
      shareholding or control, including in the form of bearer shares (including
      any future beneficiary who will control 25 percent or more through equity
      ownership or voting rights of the assets, that may be managed for example by
      a trustee). If no beneficial owner can be established using the share
      percentage, please add the passport of the Chairman of the Board or otherwise
      the CEO.
      <br />
      <br />
      <i>
        * Corporate shareholders owning more than 25% require
        the same documents as herewithin, in other words items 1, 2 ,5, 6.
      </i>
    </p>
  </BSFormGroup>
);

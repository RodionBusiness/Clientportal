import React from 'react';

import { BSFormGroup } from '@common/components';
import { upalodIconSrc } from '@onboarding/Docs/values';

export const OnboardingDocsIntroIndividual: React.StatelessComponent = () => (
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
    <p className='text-left mb-0'>
      For a successful application, please follow the below guidelines:
    </p>
    <ul className='text-left mb-4'>
      <li>Document should be in color;</li>
      <li>The whole document should be visible in the capture;</li>
      <li>Try to avoid glare.</li>
    </ul>
  </BSFormGroup>
);

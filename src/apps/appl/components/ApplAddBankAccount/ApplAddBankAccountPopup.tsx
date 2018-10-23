import * as React from 'react';
import { Link } from 'react-router-dom';

import { ApplModalBody, ApplModalFooter, ApplPopup, IApplPopupAPI } from '@appl/components/Appl/ApplPopup';

interface IApplAddBankAccountPopupProps {
  apiRef?(popupApi: IApplPopupAPI): void;
}

export const ApplAddBankAccountPopup = (props: IApplAddBankAccountPopupProps) => (
  <ApplPopup
    apiRef={props.apiRef}
    title='Registration in process'
  >
    {() => [
      <ApplModalBody key='body'>
        <p>
          We are reviewing the details and will send an email once your Designated Bank Account has been registered.
        </p>
      </ApplModalBody>,

      <ApplModalFooter key='footer'>
        <Link to='/appl-accounts' className='btn btn-primary btn-block'>
          Ок
        </Link>
      </ApplModalFooter>,
    ]}
  </ApplPopup>
);

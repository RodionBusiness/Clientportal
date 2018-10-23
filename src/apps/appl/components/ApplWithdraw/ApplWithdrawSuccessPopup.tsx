import * as React from 'react';
import { Button } from 'reactstrap';

import { ApplModalBody, ApplModalFooter, ApplPopup, IApplPopupAPI } from '@appl/components/Appl/ApplPopup';
export { IApplPopupAPI as IApplWithdrawSuccessPopupAPI } from '@appl/components/Appl/ApplPopup';

interface IApplWithdrawSuccessPopupProps {
  apiRef(popupApi: IApplPopupAPI): void;
}

export const ApplWithdrawSuccessPopup: React.StatelessComponent<IApplWithdrawSuccessPopupProps> = ({
  apiRef,
}) => (
  <ApplPopup
    apiRef={apiRef}
    title='Withdrawal Request Status'
  >
    {popupApi => [
      <ApplModalBody key='body'>
        <p>
          Your withdrawal request has been submitted.
        </p>
      </ApplModalBody>,

      <ApplModalFooter key='footer'>
        <Button onClick={popupApi.toggle} color='primary'>
          Ok
        </Button>
      </ApplModalFooter>,
    ]}
  </ApplPopup>
);

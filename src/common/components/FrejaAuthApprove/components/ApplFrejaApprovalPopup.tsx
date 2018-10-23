import * as React from 'react';

import { ApplModalBody, ApplPopup, IApplPopupAPI } from '@appl/components/Appl/ApplPopup';
import { FrejaAuthApproveComponent } from '@common/components/FrejaAuthApprove/components/FrejaAuthApproveComponent';

interface ApplFrejaApprovalPopupProps {
  apiRef?(popupApi: IApplPopupAPI): void;
}

export class ApplFrejaApprovalPopup extends React.Component<ApplFrejaApprovalPopupProps> {
  private apiRef?: IApplPopupAPI;

  render() {
    return (
      <ApplPopup apiRef={this.setApiRef} title="Freja eID signing">
        {() => [
          <ApplModalBody key="body">
            <FrejaAuthApproveComponent onCancel={this.onCancel} />
          </ApplModalBody>
        ]}
      </ApplPopup>
    );
  }

  setApiRef = (apiRef: IApplPopupAPI) => {
    this.apiRef = apiRef;

    if (this.props.apiRef) {
      this.props.apiRef(apiRef);
    }
  };

  onCancel = () => {
    if (this.apiRef) {
      this.apiRef.hide();
    }
  };
}

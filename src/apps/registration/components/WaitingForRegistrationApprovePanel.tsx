import React from 'react';
import { FrejaAuthApproveComponent } from '@common/components/FrejaAuthApprove/components/FrejaAuthApproveComponent';
import { SmallLayoutContainer } from '@common/components';
import { FrejaLinks } from '@common/components/FrejaAuthApprove/components/FrejaLinks';

interface IWaitingForApproveComponent {
  onCancel: () => void;
}

type AllProps = IWaitingForApproveComponent;

export class WaitingForRegistrationApprove extends React.Component<AllProps> {
  constructor(props: AllProps) {
    super(props);
  }

  render() {
    return (
      <SmallLayoutContainer title="Welcome to BlockSettle">
        <p>
          Take the first step to join our trading network by signing up as a Market Data
          Participant.
        </p>
        <hr />
        <FrejaAuthApproveComponent onCancel={this.props.onCancel} status={'pending'} />
        <FrejaLinks />
      </SmallLayoutContainer>
    );
  }
}

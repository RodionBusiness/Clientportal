import React from 'react';

import '@common/styles/components/freja-auth-approve.scss';
import { frejaIconSrc } from '@common/values/icons';
import { Button } from 'reactstrap';

interface IComponentProps {
  onCancel?: () => void;
  status?: 'pending' | 'failure' | 'success';
  errorMessage?: string;
}

export class FrejaAuthApproveComponent extends React.Component<IComponentProps> {
  render() {
    const { status = 'pending', errorMessage } = this.props;

    return (
      <div className="freja-auth-approve">
        <div className="freja-auth-approve__icon">
          <img src={frejaIconSrc} />
        </div>
        <p className="freja-auth-approve__note">Open Freja eID in your mobile device</p>
        <div className="freja-auth-approve__spinner-container">
          {status === 'pending' && <i className="fa fa-circle-o-notch fa-fw fa-lg fa-spin" />}
          {status === 'success' && <i className="fa fa-check fa-fw fa-lg " />}
          {status === 'failure' && (
            <div>
              <i className="fa fa-exclamation-triangle fa-fw fa-lg" />
              <p>{errorMessage}</p>
            </div>
          )}
        </div>

        {status === 'pending' && (
          <Button block={true} color="primary" type="button" onClick={this.onCancel}>
            Cancel
          </Button>
        )}
      </div>
    );
  }

  onCancel = () => {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  };
}

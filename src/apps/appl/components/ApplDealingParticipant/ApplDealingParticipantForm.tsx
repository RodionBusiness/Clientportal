import * as React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label } from 'reactstrap';

import {
  TXBTDealingStatus,
  xbtDealingServiceApply,
  xbtDealingServiceGetStatus
} from '@appl/components/ApplDealingParticipant';
import { BSCheckboxInput, BSNativeForm, wasValidated } from '@common/components';
import { IDispatchNotifyActionsProps, mapDispatchNotifyActions } from '@common/core/connectors';
import { FrejaSignService } from '@common/components/FrejaAuthApprove/services/FrejaSignSerivice';
import { getDPSigningMessage } from '@common/components/FrejaAuthApprove/helpers/frejaMessageHelper';

interface IApplDealingParticipantFormState {
  xbtDealingStatus: TXBTDealingStatus | null;
  statusLoaded: boolean;
  sending: boolean;
}

type TBSDealingParticipantFormData = {
  agreed: boolean;
};

class BSDealingParticipantForm extends BSNativeForm<{}, TBSDealingParticipantFormData> {}

export class ApplDealingParticipantFormComponent extends React.Component<
  IDispatchNotifyActionsProps,
  IApplDealingParticipantFormState
> {
  constructor(props: IDispatchNotifyActionsProps) {
    super(props);

    this.state = {
      xbtDealingStatus: null,
      statusLoaded: false,
      sending: false
    };
  }

  public componentDidMount() {
    this.loadStatus();
  }

  public render() {
    const { xbtDealingStatus, statusLoaded, sending } = this.state;

    return (
      <div>
        {statusLoaded &&
          (xbtDealingStatus === 'Not Applied' || !xbtDealingStatus) && (
            <BSDealingParticipantForm onSubmit={this.onSubmit} defaults={{ agreed: false }}>
              {form => (
                <div>
                  <FormGroup className={wasValidated({ formApi: form, field: 'agreed' })}>
                    <FormGroup check={true}>
                      <Label check={true}>
                        <BSCheckboxInput field="agreed" formApi={form} required={true}>
                          {' I accept the '}
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={process.env.DEALING_PARTICIPANT_AGREEMENT}
                          >
                            Dealing Participant Agreement
                          </a>
                        </BSCheckboxInput>
                      </Label>
                    </FormGroup>
                  </FormGroup>

                  <FormGroup>
                    <Button color="primary" type="submit" disabled={!form.valid() || sending}>
                      Apply for XBT Dealing status
                    </Button>
                  </FormGroup>
                </div>
              )}
            </BSDealingParticipantForm>
          )}

        {xbtDealingStatus === 'Pending' && (
          <h4> Your application for XBT Dealing status is in progress</h4>
        )}

        {xbtDealingStatus === 'Open' && <h4>Your XBT Dealing status is now authorized</h4>}

        {(xbtDealingStatus === 'Closed' || xbtDealingStatus === 'Denied') && (
          <h4>
            Your XBT Dealing status has <b>not been authorized</b>
          </h4>
        )}

        {xbtDealingStatus === 'Not Applied' && (
          <h4>Application for XBT Dealing status has not been submitted</h4>
        )}

        {xbtDealingStatus === 'Insufficient Funds' && (
          <h4>
            The Dealing Participant application has been rejected.
            <br />
            Please ensure that you have minimum Account Balance: EUR 5,000 or equivalent.
          </h4>
        )}
      </div>
    );
  }

  private loadStatus = async () => {
    try {
      const xbtDealingStatus = await xbtDealingServiceGetStatus();

      this.setState({
        xbtDealingStatus,
        statusLoaded: true
      });
    } catch (err) {
      this.props.notifyError(`Unable to load data: ${err.message || String(err)}`);
    }
  };

  private onSubmit = async () => {
    this.setState({ sending: true });

    try {
      let xbtDealingStatus: TXBTDealingStatus = 'Pending';
      let errorMessage: string = '';
      let successMessage: string = '';

      await FrejaSignService.sign(getDPSigningMessage());

      const { error, success, current_balance } = await xbtDealingServiceApply();

      if (success) {
        xbtDealingStatus = 'Pending';
        successMessage = 'Your application is being processed';
      } else if (error) {
        switch (error.code) {
          case 10001:
            xbtDealingStatus = 'Pending';
            successMessage = 'Your application is being processed';
            break;

          case 10002:
            xbtDealingStatus = 'Insufficient Funds';
            errorMessage = `Insufficient funds in the account (EUR ${current_balance})`;
            break;

          case 10003:
            xbtDealingStatus = 'Denied';
            errorMessage = 'Only Entity Administrators are allowed to apply for XBT Trading Status';
            break;

          case 10004:
            xbtDealingStatus = 'Denied';
            errorMessage = error.message;
            break;

          default:
            throw new Error('Unknown rejection reason');
        }
      }

      this.setState({
        xbtDealingStatus
      });

      if (successMessage) {
        this.props.notifySuccess(successMessage);
      } else if (errorMessage) {
        this.props.notifyError(errorMessage);
      }
    } catch (err) {
      this.props.notifyError(`Unable to load data: ${err.message || String(err)}`);
    }

    this.setState({ sending: false });
  };
}

export const ApplDealingParticipantForm = connect(
  null,
  mapDispatchNotifyActions
)(ApplDealingParticipantFormComponent);

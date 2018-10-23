import * as React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import { supportServiceAdd } from '@appl/components/ApplSupport';
import { IUserState } from '@appl/core/types';
import { BSFormGroup, BSInput, BSNativeForm, IBSNativeFormAPI } from '@common/components';
import { IDispatchNotifyActionsProps, mapDispatchNotifyActions } from '@common/core/connectors';
import { FrejaSignService } from '@common/components/FrejaAuthApprove/services/FrejaSignSerivice';
import { getNewTickerSigningMessage } from '@common/components/FrejaAuthApprove/helpers/frejaMessageHelper';

interface IApplSupportAddFormState {
  loading: boolean;
}

interface IMapProps {
  user: IUserState;
}

type TApplSupportFormProps = IMapProps & IDispatchNotifyActionsProps;

const mapProps = ({ user }: IMapProps) => ({ user });

type TNewMessageFormData = {
  subject: string;
  message: string;
};

class BSNewSupportMessageForm extends BSNativeForm<{}, TNewMessageFormData> {}

export class ApplSupportFormComponent extends React.Component<
  TApplSupportFormProps,
  IApplSupportAddFormState
> {
  private formAPI?: IBSNativeFormAPI;

  constructor(props: TApplSupportFormProps) {
    super(props);

    this.state = {
      loading: false
    };
  }

  public render() {
    const { loading } = this.state;

    return (
      <BSNewSupportMessageForm
        apiRef={this.setApiRef}
        onSubmit={this.onSubmit}
        defaults={{ subject: '', message: '' }}
      >
        {form => (
          <div>
            <BSFormGroup formApi={form} field="subject">
              <BSInput
                type="text"
                formLabel="Subject"
                field="subject"
                formApi={form}
                required={true}
              />
            </BSFormGroup>

            <BSFormGroup formApi={form} field="message">
              <BSInput
                className="helper__min-height--100"
                type="textarea"
                formLabel="Details"
                field="message"
                formApi={form}
                required={true}
              />
            </BSFormGroup>

            <BSFormGroup>
              <Button
                block={true}
                color="primary"
                type="submit"
                disabled={!form.valid() && !loading}
              >
                Send
              </Button>
            </BSFormGroup>
          </div>
        )}
      </BSNewSupportMessageForm>
    );
  }

  private onSubmit = async (data: TNewMessageFormData) => {
    this.setState({ loading: true });

    try {
      await FrejaSignService.sign(getNewTickerSigningMessage());

      await supportServiceAdd(this.props.user, data);
      if (this.formAPI) {
        this.formAPI.reset();
      }
    } catch (err) {
      this.props.notifyError(err.message || String(err));
    }

    this.setState({ loading: false });
  };

  private setApiRef = (ref: IBSNativeFormAPI) => {
    this.formAPI = ref;
  };
}

export const ApplSupportForm = connect(
  mapProps,
  mapDispatchNotifyActions
)(ApplSupportFormComponent);

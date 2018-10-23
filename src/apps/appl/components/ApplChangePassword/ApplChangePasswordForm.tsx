import * as React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import { changePasswordServiceUpdate } from '@appl/components/ApplChangePassword/services';
import { IUserState } from '@appl/core/types';
import { BSFormGroup, BSInput, BSNativeForm, IBSNativeFormAPI } from '@common/components';
import { IDispatchNotifyActionsProps, mapDispatchNotifyActions } from '@common/core/connectors';
import { equalityThoughInputPattern } from '@common/core/helpers';

type ApplWithdrawAddFormData = {
  oldPassword: string;
  password: string;
  passwordConfirmation: string;
};

class BSNewWithdrawForm extends BSNativeForm<{}, ApplWithdrawAddFormData> { }

interface IMapProps {
  user: IUserState;
}

const mapProps = ({ user }: IMapProps) => ({ user });

type TApplChangePasswordFormProps = IMapProps & IDispatchNotifyActionsProps;

interface IApplWithdrawAddFormState {
  loading: boolean;
}

const PASSWORD_PATTERN = String(process.env.PASSWORD_PATTERN || '');

export class ApplChangePasswordFormComponent
  extends React.Component<TApplChangePasswordFormProps, IApplWithdrawAddFormState> {
  private formAPI?: IBSNativeFormAPI;

  constructor(props: TApplChangePasswordFormProps) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  public render() {
    const { loading } = this.state;

    return (
      <BSNewWithdrawForm
        apiRef={this.setApiRef}
        onSubmit={this.onSubmit}
        defaults={{ oldPassword: '', password: '', passwordConfirmation: '' }}
      >
        {(form, { password }: ApplWithdrawAddFormData) => (
          <div className='fixed-width-container--270'>
            <BSFormGroup formApi={form} field='oldPassword'>
              <BSInput
                field='oldPassword'
                type='password'
                min='0'
                formLabel='Current password'
                formApi={form}
                required={true}
              />
            </BSFormGroup>

            <BSFormGroup formApi={form} field='password'>
              <BSInput
                field='password'
                type='password'
                min='0'
                pattern={PASSWORD_PATTERN}
                formLabel='New Password'
                formApi={form}
                required={true}
              />
            </BSFormGroup>

            <BSFormGroup formApi={form} field='passwordConfirmation'>
              <BSInput
                field='passwordConfirmation'
                type='password'
                pattern={equalityThoughInputPattern(password)}
                min='0'
                formLabel='Password Again'
                formApi={form}
                required={true}
              />
            </BSFormGroup>

            <BSFormGroup>
              <i>Use a minimum password length of 8 characters and include
              at least one lowercase letter, one uppercase letter, and
              one number.
              </i>
            </BSFormGroup>

            <BSFormGroup>
              <Button
                block={true}
                color='primary'
                type='submit'
                disabled={!form.valid() || loading}
              >
                Change Password
              </Button>
            </BSFormGroup>
          </div>
        )}
      </BSNewWithdrawForm>
    );
  }

  private onSubmit = async (data: ApplWithdrawAddFormData) => {
    this.setState({ loading: true });

    try {
      const { userId } = this.props.user;

      await changePasswordServiceUpdate({
        ...data,
        userId,
      });
      if (this.formAPI) {
        this.formAPI.reset();
      }
      this.props.notifySuccess('Password successfully changed!');

    } catch (err) {
      this.props.notifyError(err.message || String(err));
    }

    this.setState({ loading: false });
  }

  private setApiRef = (ref: IBSNativeFormAPI) => {
    this.formAPI = ref;
  }
}

export const ApplChangePasswordForm =
  connect(mapProps, mapDispatchNotifyActions)(ApplChangePasswordFormComponent);

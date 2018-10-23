import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, FormGroup } from 'reactstrap';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { BSEmailInput, BSNativeForm, BSSpinner, wasValidated } from '@common/components';
import { mapDispatchNotifyActions } from '@common/core/connectors';
import { submit } from '@forgot-password/core/actions';
import { IForgotPasswordState } from '@forgot-password/core/types';
import { IPubState } from '@pub/core/types';

type IForgotPasswordFormData = {
  email: string;
};

class BSLoginForm extends BSNativeForm<{}, IForgotPasswordFormData> { }

interface IDispatchProps {
  onSubmit(values: IForgotPasswordFormData): void;
  onEmailLowercased(actualEmail: string, locasedEmail: string): void;
}

interface IMapProps {
  forgotPasswordForm: IForgotPasswordState;
}

export const ForgotPasswordForm = connect(
  ({ forgotPasswordForm }: IPubState): IMapProps => ({ forgotPasswordForm }),
  (dispatch: ThunkDispatch<IPubState, never, AnyAction>): IDispatchProps => ({
    onSubmit: values => dispatch(submit(values.email)),
    onEmailLowercased: () =>
      mapDispatchNotifyActions(dispatch).notifyError(
        `Email with uppercase letters is not allowed.
        It was converted to lowercase automatically.`,
      ),
  }),
)(props => (
  <BSLoginForm onSubmit={props.onSubmit} defaults={{ email: '' }}>
    {(form, { email }: IForgotPasswordFormData) => (
      <div>
        <FormGroup className={wasValidated({ formApi: form, field: 'email' })}>
          <BSEmailInput
            field='email'
            formLabel='Email'
            value={email}
            formApi={form}
            required={true}
            placeholder='Enter your email to restore password'
            disabled={props.forgotPasswordForm.sending}
            onEmailLowercased={props.onEmailLowercased}
          />
        </FormGroup>

        <FormGroup>
          <Button
            block={true}
            color='primary'
            type='submit'
            disabled={!form.valid() || props.forgotPasswordForm.sending}
          >
            <BSSpinner
              spin={props.forgotPasswordForm.sending}
              className='mr-2'
              hide={!props.forgotPasswordForm.sending}
            />
            Send
          </Button>
        </FormGroup>

        <FormGroup>
          <Link
            className='btn btn-block btn-outline-primary'
            to='/pub-login'
            title='Return to Login Page'
          >
            Cancel
          </Link>
        </FormGroup>
      </div>
    )}
  </BSLoginForm>
));

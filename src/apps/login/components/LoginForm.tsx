import * as React from 'react';
import { Link } from 'react-router-dom';

import '@login/styles/login-form.sass';

import { BSEmailInput, BSFormGroup, BSNativeForm, BSCheckboxInput } from '@common/components';
import { BSFrejaButton } from '@common/components/BS/BSFrejaButton';
import { ILoginModel } from '@login/core/models/ILoginModel';

const EMAIL_PATTERN = String(process.env.EMAIL_PATTERN || '');

interface IComponentProps {
  onSubmit(values: ILoginModel): void;
  onEmailLowercased?(actualEmail: string, locasedEmail: string): void;
  disabled: boolean;
  email?: string;
  rememberEmail?: boolean;
}

export const LoginForm: React.StatelessComponent<IComponentProps> = ({
  disabled,
  onSubmit,
  onEmailLowercased,
  email,
  rememberEmail
}) => (
  <BSNativeForm<{}, ILoginModel>
    onSubmit={onSubmit}
    defaults={{ email: email, password: '', twoFAPhrase: '', rememberEmail: rememberEmail}}
  >
    {form => (
      <div>
        <BSFormGroup formApi={form} field="email">
          <BSEmailInput
            field="email"
            formLabel="Email"
            pattern={EMAIL_PATTERN}
            formApi={form}
            required={true}
            disabled={disabled}
            onEmailLowercased={onEmailLowercased}
            className="pub-login-form--email-input"
            placeholder="Enter your email address"
          />
        </BSFormGroup>

        <BSFormGroup formApi={form} field="rememberEmail">
          <BSCheckboxInput
            field="rememberEmail"
            formLabel="Remember email"
            formApi={form}/>
        </BSFormGroup>

        <BSFormGroup>
          <BSFrejaButton
            block={true}
            type="submit"
            disabled={!form.valid() || disabled}
            loading={disabled}
          >
            Sign in with <b>Freja eID</b>
          </BSFrejaButton>
        </BSFormGroup>

        <BSFormGroup>
          <Link to="/pub-registration" className="btn btn-link btn-block">
            Register
          </Link>
        </BSFormGroup>
      </div>
    )}
  </BSNativeForm>
);

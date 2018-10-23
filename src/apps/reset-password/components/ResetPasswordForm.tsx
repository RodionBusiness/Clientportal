import * as React from 'react';
import { Button } from 'reactstrap';

import { BSFormGroup, BSInput, BSNativeForm, BSSpinner } from '@common/components';
import { equalityThoughInputPattern } from '@common/core/helpers';
import { IResetPasswordFormData } from '@reset-password/core/types';

const PASSWORD_PATTERN = String(process.env.PASSWORD_PATTERN || '');

class BSResetPasswordForm extends BSNativeForm<{}, IResetPasswordFormData> { }

interface IResetPasswordFormProps {
  submitting: boolean;
  onSubmit(values: IResetPasswordFormData): void;
}

export const ResetPasswordForm: React.StatelessComponent<IResetPasswordFormProps> = ({
  onSubmit,
  submitting,
}) => (
  <BSResetPasswordForm
    onSubmit={onSubmit}
    defaults={{ password: '', passwordConfirmation: '' }}
  >
    {(form, { password }: IResetPasswordFormData) => (
      <div>
        <BSFormGroup formApi={form} field='password'>
          <BSInput
            field='password'
            type='password'
            min='0'
            formLabel='Password'
            formApi={form}
            required={true}
            placeholder='Enter new password'
            disabled={submitting}
            pattern={PASSWORD_PATTERN}
          />
        </BSFormGroup>

        <BSFormGroup formApi={form} field='passwordConfirmation'>
          <BSInput
            field='passwordConfirmation'
            type='password'
            formLabel='Confirm Password'
            formApi={form}
            required={true}
            placeholder='Enter new password again'
            disabled={submitting}
            pattern={equalityThoughInputPattern(password)}
          />
        </BSFormGroup>

        <BSFormGroup>
          <i>Use a minimum password length of 8 characters and include
          at least one lowercase letter, one uppercase letter, and
          one number.</i>
        </BSFormGroup>

        <BSFormGroup>
          <Button
            block={true}
            color='primary'
            type='submit'
            disabled={!form.valid() || submitting}
          >
            <BSSpinner
              spin={submitting}
              className='mr-2'
              hide={!submitting}
            />
            Send
          </Button>
        </BSFormGroup>
      </div>
    )}

  </BSResetPasswordForm>
);

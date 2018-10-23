import * as React from 'react';
import { Link } from 'react-router-dom';
import { FormGroup } from 'reactstrap';

import {
  BSCheckboxInput,
  BSEmailInput,
  BSFormGroup,
  BSFormLabel,
  BSInput,
  BSNativeForm,
  BSRadioInput
} from '@common/components';
import { AccountType } from '@common/core/types';
import { BSFrejaButton } from '@common/components/BS/BSFrejaButton';
import { IRegistrationModel } from '@registration/core/models/RegistrationModel';
import { showAlertNotification } from '@common/core/actions';
import { FrejaLinks } from '@common/components/FrejaAuthApprove/components/FrejaLinks';

const EMAIL_PATTERN = String(process.env.EMAIL_PATTERN || '');
const ONBOARDING_NAME_MAX_LEN = parseInt(String(process.env.ONBOARDING_NAME_MAX_LEN || 23), 10);
const ONBOARDING_COMPANY_NAME_MAX_LEN = parseInt(
  String(process.env.ONBOARDING_COMPANY_NAME_MAX_LEN || 45),
  10
);

class BSRegistrationForm extends BSNativeForm<{}, IRegistrationModel> {}

export interface IRegistrationFormProps {
  onSubmit: (values: IRegistrationModel) => void;
  loading: boolean;
}

export class RegistrationForm extends React.Component<IRegistrationFormProps> {
  render() {
    const { onSubmit, loading } = this.props;
    return (
      <BSRegistrationForm
        onSubmit={onSubmit}
        defaults={{
          accountType: AccountType.individual,
          certification: false,
          companyName: '',
          email: '',
          firstName: '',
          lastName: ''
        }}
      >
        {(form, { accountType }) => (
          <div>
            <p>
              Take the first step to join our trading network by signing up as a Market Data
              Participant.
            </p>

            <div className="card form-group border-0">
              <div className="card-body">
                <BSFormLabel>Select Your Account Type</BSFormLabel>
                <BSRadioInput
                  checked={accountType === AccountType.individual}
                  field="accountType"
                  formLabel="Individual"
                  value={AccountType.individual}
                  formApi={form}
                  required={true}
                />
                <BSRadioInput
                  checked={accountType === AccountType.corporate}
                  field="accountType"
                  formLabel="Corporate"
                  value={AccountType.corporate}
                  formApi={form}
                  required={true}
                />
              </div>
            </div>

            {accountType === AccountType.corporate && (
              <BSFormGroup formApi={form} field="companyName">
                <BSInput
                  field="companyName"
                  type="text"
                  formLabel="Company name"
                  formApi={form}
                  required={true}
                  maxLength={ONBOARDING_COMPANY_NAME_MAX_LEN}
                  placeholder="Enter company name"
                />
              </BSFormGroup>
            )}

            <BSFormGroup formApi={form} field="email">
              <BSEmailInput
                field="email"
                formLabel="Email"
                pattern={EMAIL_PATTERN}
                formApi={form}
                required={true}
                className="pub-login-form--email-input"
                onEmailLowercased={this.onEmailLowercased}
                placeholder={`${
                  accountType === AccountType.corporate
                    ? 'Enter email address of authorised representative'
                    : 'Enter your email address'
                }`}
              />
            </BSFormGroup>

            <BSFormGroup formApi={form} field="firstName">
              <BSInput
                field="firstName"
                type="text"
                formLabel={`First name${
                  accountType === AccountType.corporate ? ' of authorised representative' : ''
                }`}
                formApi={form}
                required={true}
                maxLength={ONBOARDING_NAME_MAX_LEN}
                placeholder={`Enter first name${
                  accountType === AccountType.corporate ? ' of authorised representative' : ''
                }`}
              />
            </BSFormGroup>

            <BSFormGroup formApi={form} field="lastName">
              <BSInput
                field="lastName"
                type="text"
                formLabel={`Last name${
                  accountType === AccountType.corporate ? ' of authorised representative' : ''
                }`}
                formApi={form}
                required={true}
                maxLength={ONBOARDING_NAME_MAX_LEN}
                placeholder={`Enter last name${
                  accountType === AccountType.corporate ? ' of authorised representative' : ''
                }`}
              />
            </BSFormGroup>

            <BSFormGroup formApi={form} field="certification">
              <BSCheckboxInput field="certification" formApi={form} required={true}>
                <div>
                  {' I agree to the terms and conditions of the '}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={process.env.FILE_MARKET_DATA_AGREEMENT}
                  >
                    Market Data Agreement
                  </a>
                </div>
              </BSCheckboxInput>
            </BSFormGroup>

            <FormGroup>
              <BSFrejaButton
                block={true}
                type="submit"
                disabled={!form.valid() || loading}
                loading={loading}
              >
                Register with <b>Freja eID</b>
              </BSFrejaButton>
            </FormGroup>

            <FormGroup>
              <Link className="btn btn-block btn-link" to="/pub-login" title="Return to Login Page">
                Cancel
              </Link>
            </FormGroup>

            <FrejaLinks />
          </div>
        )}
      </BSRegistrationForm>
    );
  }

  onEmailLowercased = () => {
    showAlertNotification({
      message: `Email with uppercase letters is not allowed.
    It was converted to lowercase automatically.`
    });
  };
}

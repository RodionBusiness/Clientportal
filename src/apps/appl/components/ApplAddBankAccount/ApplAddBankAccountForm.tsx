import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap';

import { IApplPopupAPI } from '@appl/components/Appl/ApplPopup';
import {
  ApplAddBankAccountPopup,
  ApplBankAccountInfo,
  bankAccountServiceAdd,
  bankAccountServiceGetBankInfo,
  TBankAccountType,
  TBankInfo
} from '@appl/components/ApplAddBankAccount';
import {
  BSFormGroup,
  BSFormLabel,
  BSInput,
  BSNativeForm,
  DropzoneContainer,
  IBSNativeFormAPI,
  IDocument,
  wasValidated
} from '@common/components';
import { BSIbanInput } from '@common/components/BSIban';
import { IDispatchNotifyActionsProps } from '@common/core/connectors';
import { FrejaSignService } from '@common/components/FrejaAuthApprove/services/FrejaSignSerivice';
import { getAddBASigningMessage } from '@common/components/FrejaAuthApprove/helpers/frejaMessageHelper';

type TAddBankAccountFormData = {
  ibanBicSwift: string;
  accountDescription: string;
  accountNumber: string;
  accountName: string;
};

class BSAddBankAccountForm extends BSNativeForm<{}, TAddBankAccountFormData> {}

interface IApplAddBankAccountFormState {
  sending: boolean;
  proofFile: IDocument | null;
  bankInfo: TBankInfo | null;
  accountType: TBankAccountType;
  accountName: string | null;
}

export class ApplAddBankAccountForm extends React.Component<
  IDispatchNotifyActionsProps,
  IApplAddBankAccountFormState
> {
  public state: IApplAddBankAccountFormState = {
    sending: false,
    proofFile: null,
    bankInfo: null,
    accountType: TBankAccountType.iban,
    accountName: null
  };

  private formAPI?: IBSNativeFormAPI;
  private popupAPI?: IApplPopupAPI;

  public render() {
    const { notifyError } = this.props;
    const { accountType, bankInfo, sending } = this.state;

    return (
      <div>
        <BSAddBankAccountForm
          onSubmit={this.onSubmit}
          apiRef={this.setApiRef}
          defaults={{
            accountType: TBankAccountType.iban,
            accountNumber: '',
            accountDescription: ''
          }}
        >
          {form => (
            <div>
              <h4 className="mb-3">Account details</h4>

              <BSFormGroup>
                <BSFormLabel>Account Type</BSFormLabel>
                <FormGroup check={true}>
                  <Label check={true}>
                    <Input
                      className="bs-radio-input"
                      checked={accountType === TBankAccountType.iban}
                      type="radio"
                      value={TBankAccountType.iban}
                      onChange={this.onAccountTypeChange}
                    />
                    IBAN
                  </Label>
                </FormGroup>

                <FormGroup check={true}>
                  <Label check={true}>
                    <Input
                      className="bs-radio-input"
                      checked={accountType === TBankAccountType.swift}
                      type="radio"
                      value={TBankAccountType.swift}
                      onChange={this.onAccountTypeChange}
                    />
                    BIC/SWIFT
                  </Label>
                </FormGroup>
              </BSFormGroup>

              <Row className="align-items-baseline">
                <Col xs="6">
                  {accountType === TBankAccountType.iban && (
                    <FormGroup className={wasValidated({ formApi: form, field: 'ibanBicSwift' })}>
                      <BSIbanInput
                        field="ibanBicSwift"
                        formLabel="IBAN"
                        formApi={form}
                        required={true}
                        onFinishInput={this.updateIban}
                      >
                        <div className="invalid-feedback">Invalid IBAN</div>
                      </BSIbanInput>
                    </FormGroup>
                  )}

                  {accountType === TBankAccountType.swift && (
                    <BSFormGroup formApi={form} field="ibanBicSwift">
                      <BSInput
                        field="ibanBicSwift"
                        type="text"
                        formLabel="BIC/SWIFT"
                        formApi={form}
                        required={true}
                      />
                    </BSFormGroup>
                  )}
                </Col>

                <Col xs="6">
                  <BSFormGroup formApi={form} field="accountDescription">
                    <BSInput
                      field="accountDescription"
                      type="text"
                      min="0"
                      formLabel="Account description (for your own reference)"
                      formApi={form}
                      required={true}
                    />
                  </BSFormGroup>
                </Col>
              </Row>

              <Row className="align-items-baseline">
                <Col xs="6">
                  <BSFormGroup formApi={form} field="accountNumber">
                    <BSInput
                      field="accountNumber"
                      type="text"
                      formLabel="Account No"
                      formApi={form}
                      required={true}
                      disabled={accountType === TBankAccountType.iban}
                    />
                  </BSFormGroup>
                </Col>

                <Col xs="6">
                  <BSFormGroup formApi={form} field="accountName">
                    <BSInput
                      field="accountName"
                      formApi={form}
                      type="text"
                      required={true}
                      formLabel="Name on account (as on proof of ownership)"
                    />
                  </BSFormGroup>
                </Col>
              </Row>

              <h4 className="mb-3 pt-3">Proof of Account Ownership</h4>

              <DropzoneContainer
                formLabel="Proof of Ownership *"
                filename="proof_owner"
                formApi={form}
                onFileUpload={this.onFileDropUpload}
                notifyError={notifyError}
                required={true}
              />

              {bankInfo && <ApplBankAccountInfo bankInfo={bankInfo} />}

              <Row className="pt-3">
                <Col xs="6">
                  <BSFormGroup>
                    <Button
                      block={true}
                      color="primary"
                      type="submit"
                      disabled={
                        !form.valid() ||
                        sending ||
                        (accountType === TBankAccountType.iban && bankInfo === null)
                      }
                    >
                      Save Changes
                    </Button>
                  </BSFormGroup>

                  <BSFormGroup>
                    <Link to="/appl-accounts">
                      <Button block={true} type="button" disabled={sending}>
                        Cancel
                      </Button>
                    </Link>
                  </BSFormGroup>
                </Col>
              </Row>
            </div>
          )}
        </BSAddBankAccountForm>
        <ApplAddBankAccountPopup apiRef={this.setPopupRef} />
      </div>
    );
  }

  private onFileDropUpload = (proofFile: IDocument) => this.setState({ proofFile });

  private updateIban = async (value: string) => {
    if (!value || value === '') {
      this.setState({ bankInfo: null });

      return;
    }

    try {
      const bankInfo = await bankAccountServiceGetBankInfo(value);
      if (this.formAPI) {
        this.formAPI.setValue('accountNumber', bankInfo.accountNumber);
      }
      this.setState({ bankInfo });
    } catch (err) {
      this.props.notifyError(err.message || String(err));
      this.setState({ bankInfo: null });
    }
  };

  private onAccountTypeChange = (evt: React.SyntheticEvent<HTMLInputElement>) => {
    const value = evt.currentTarget.value;
    if (this.formAPI) {
      this.formAPI.reset();
    }
    this.setState({
      accountType: value === TBankAccountType.swift ? TBankAccountType.swift : TBankAccountType.iban
    });
    this.setState({ bankInfo: null });
  };

  private onSubmit = async (data: TAddBankAccountFormData) => {
    const { accountType, bankInfo, proofFile } = this.state;

    if (!proofFile) {
      this.props.notifyError('You must upload a proof of ownership when add new bank accounts');

      return;
    }

    if (!data.ibanBicSwift || data.ibanBicSwift === '') {
      this.props.notifyError('You must specify IBAN/BIC/SWIFT');

      return;
    }

    this.setState({ sending: true });

    try {
      await FrejaSignService.sign(getAddBASigningMessage(this.state.accountType, data.ibanBicSwift));

      const { status } = await bankAccountServiceAdd({ accountType, ...data }, proofFile, bankInfo);
      if (status === 'saved') {
        if (this.formAPI) {
          this.formAPI.reset();
        }
        this.setState({ bankInfo: null, proofFile: null });

        if (this.popupAPI) {
          this.popupAPI.show();
        }
      } else {
        throw new Error('Duplicate account name or external account name');
      }
    } catch (err) {
      this.props.notifyError(err.message || String(err));
    }

    this.setState({ sending: false });
  };

  private setApiRef = (ref: IBSNativeFormAPI) => (this.formAPI = ref);

  private setPopupRef = (ref: IApplPopupAPI) => (this.popupAPI = ref);
}

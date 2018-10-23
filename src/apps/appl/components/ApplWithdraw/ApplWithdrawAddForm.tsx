import * as React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import {
  ApplWithdrawSuccessPopup,
  IApplWithdrawSuccessPopupAPI,
  TExternalAccount,
  withdrawServiceAdd
} from '@appl/components/ApplWithdraw';
import { TClearingAccount, TTradingAccount } from '@appl/core/services/LiveOrders';
import {
  BSFormGroup,
  BSInput,
  BSNativeForm,
  BSSelect,
  IBSNativeFormAPI,
  TOption
} from '@common/components';
import { IDispatchNotifyActionsProps, mapDispatchNotifyActions } from '@common/core/connectors';
import { FrejaSignService } from '@common/components/FrejaAuthApprove/services/FrejaSignSerivice';
import { getWithdrawalSigningMessage } from '@common/components/FrejaAuthApprove/helpers/frejaMessageHelper';

interface IApplWithdrawAddFormOwnProps {
  externalAccounts: TExternalAccount[];
  clearingAccount: TClearingAccount | null;
  tradingAccounts: TTradingAccount[];
}

type TApplWithdrawAddFormProps = IDispatchNotifyActionsProps & IApplWithdrawAddFormOwnProps;

interface IApplWithdrawAddFormState {
  externalAccountOptions: TOption[];
  currencyOptions: TOption[];
  clearingAccount: TClearingAccount | null;
  loading: boolean;
}

type TNewWithdrawFormData = {
  externalAccount: string;
  currency: string;
  amount: string;
};

class BSNewWithdrawForm extends BSNativeForm<{}, TNewWithdrawFormData> {}

export class ApplWithdrawAddFormComponent extends React.Component<
  TApplWithdrawAddFormProps,
  IApplWithdrawAddFormState
> {
  public state: IApplWithdrawAddFormState = {
    externalAccountOptions: [],
    currencyOptions: [],
    clearingAccount: null,
    loading: false
  };

  private formAPI?: IBSNativeFormAPI;

  private popupApiRef?: IApplWithdrawSuccessPopupAPI;

  public async componentWillReceiveProps(nextProps: TApplWithdrawAddFormProps) {
    const { externalAccounts, clearingAccount, tradingAccounts } = nextProps;

    if (clearingAccount && tradingAccounts && externalAccounts) {
      this.setState({
        clearingAccount,
        currencyOptions: tradingAccounts.map(({ ccy: label, ccyId: value }) => ({
          label,
          value: String(value)
        })),
        externalAccountOptions: externalAccounts.map(({ displayLabel: label, value: value }) => ({
          label,
          value: String(value)
        }))
      });
    }
  }

  public render() {
    const { currencyOptions, externalAccountOptions, loading } = this.state;

    return (
      <BSNewWithdrawForm
        apiRef={this.setApiRef}
        onSubmit={this.onSubmit}
        defaults={{ currency: '', amount: '', externalAccount: '' }}
      >
        {(form, { currency }: TNewWithdrawFormData) => (
          <div>
            <ApplWithdrawSuccessPopup apiRef={this.setPopupApiRef} />

            <BSFormGroup formApi={form} field="externalAccount">
              <BSSelect
                label="Select account..."
                formLabel="Select account to withdraw to"
                field="externalAccount"
                formApi={form}
                options={externalAccountOptions}
                required={true}
              />
            </BSFormGroup>

            <BSFormGroup formApi={form} field="currency">
              <BSSelect
                label="Select currency..."
                formLabel="Currency"
                field="currency"
                formApi={form}
                options={currencyOptions}
                required={true}
              />
            </BSFormGroup>

            <BSFormGroup formApi={form} field="amount">
              <BSInput
                field="amount"
                type="number"
                min="0"
                formLabel="Amount"
                formApi={form}
                required={true}
                disabled={currency === ''}
              />
            </BSFormGroup>

            <BSFormGroup>
              <Button
                block={true}
                color="primary"
                type="submit"
                disabled={!form.valid() && !loading}
              >
                Request Withdrawal
              </Button>
            </BSFormGroup>
          </div>
        )}
      </BSNewWithdrawForm>
    );
  }

  private onSubmit = async (data: TNewWithdrawFormData) => {
    const tradingAccount: TTradingAccount | undefined = this.props.tradingAccounts.find(item => {
      return item.ccyId === parseFloat(data.currency);
    });
    const externalAccount: TExternalAccount | undefined = this.props.externalAccounts.find(item => {
      return item.value === parseFloat(data.externalAccount);
    });
    const amount: number = parseFloat(data.amount) || 0;
    const { clearingAccount } = this.props;

    if (!tradingAccount || !externalAccount || !clearingAccount) {
      return;
    }

    this.setState({ loading: true });

    try {
      await FrejaSignService.sign(
        getWithdrawalSigningMessage(amount, clearingAccount.iban, tradingAccount.ccy)
      );

      await withdrawServiceAdd({
        amount,
        externalAccount,
        tradingAccount,
        date: new Date()
      });

      this.showSuccessModal();
      if (this.formAPI) {
        this.formAPI.reset();
      }
    } catch (err) {
      this.props.notifyError(err.message || String(err));
    }

    this.setState({ loading: false });
  };

  private setPopupApiRef = (apiRef: IApplWithdrawSuccessPopupAPI) => (this.popupApiRef = apiRef);

  private showSuccessModal = () => this.popupApiRef && this.popupApiRef.show();

  private setApiRef = (ref: IBSNativeFormAPI) => (this.formAPI = ref);
}

export const ApplWithdrawAddForm = connect(
  null,
  mapDispatchNotifyActions
)(ApplWithdrawAddFormComponent);

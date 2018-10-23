import * as React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import {
  depositsServiceAdd,
  IApplDepositPopupAPI,
  IDepositModel
} from '@appl/components/ApplDepositPanel';
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
import { getDepositSigningMessage } from '@common/components/FrejaAuthApprove/helpers/frejaMessageHelper';

type TNewDepositFormData = {
  currency: string;
  amount: string;
};

interface IApplDepositAddFormOwnProps {
  modalApi: IApplDepositPopupAPI | undefined;
  clearingAccount: TClearingAccount | null;
  tradingAccounts: TTradingAccount[];
}

type TApplDepositAddFormProps = IDispatchNotifyActionsProps & IApplDepositAddFormOwnProps;

interface IApplDepositAddFormState {
  currencies: TOption[];
  clearingAccount: TClearingAccount | null;
  tradingAccounts: TTradingAccount[];
  loading: boolean;
}

class BSNewDepositForm extends BSNativeForm<{}, TNewDepositFormData> {}

export class ApplDepositAddFormComponent extends React.Component<
  TApplDepositAddFormProps,
  IApplDepositAddFormState
> {
  private formAPI?: IBSNativeFormAPI;

  constructor(props: TApplDepositAddFormProps) {
    super(props);

    this.state = {
      currencies: [],
      clearingAccount: null,
      tradingAccounts: [],
      loading: false
    };
  }

  public async componentWillReceiveProps(
    nextProps: IApplDepositAddFormOwnProps & IDispatchNotifyActionsProps
  ) {
    const { clearingAccount, tradingAccounts } = nextProps;

    if (clearingAccount && tradingAccounts) {
      this.setState({
        clearingAccount,
        tradingAccounts,
        currencies: tradingAccounts.map(({ ccy: label, ccyId: value }) => ({
          label,
          value: String(value)
        }))
      });
    }
  }

  public render() {
    const { currencies, loading } = this.state;

    return (
      <BSNewDepositForm
        apiRef={this.setApiRef}
        onSubmit={this.onSubmit}
        defaults={{ currency: '', amount: '' }}
      >
        {(form, { currency }: TNewDepositFormData) => (
          <div>
            <BSFormGroup formApi={form} field="currency">
              <BSSelect
                label="Select currency..."
                formLabel="Currency"
                field="currency"
                formApi={form}
                options={currencies}
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
                Generate Deposit Reference
              </Button>
            </BSFormGroup>
          </div>
        )}
      </BSNewDepositForm>
    );
  }

  private onSubmit = async (data: TNewDepositFormData) => {
    const tradingAccount: TTradingAccount | undefined = this.state.tradingAccounts.find(item => {
      return item.ccyId === parseFloat(data.currency);
    });
    const amount: number = parseFloat(data.amount) || 0;

    if (!tradingAccount) {
      return;
    }

    this.setState({ loading: true });

    try {
      await FrejaSignService.sign(getDepositSigningMessage());

      const newDeposit: IDepositModel = await depositsServiceAdd({
        amount,
        tradingAccount: tradingAccount || null,
        date: new Date()
      });

      if (this.props.modalApi) {
        this.props.modalApi.show(this.props.clearingAccount, {
          currency: tradingAccount.ccy,
          amount: newDeposit.amount,
          refID: newDeposit.refID ? newDeposit.refID : ''
        });
      }
    } catch (err) {
      this.props.notifyError(err.message || String(err));
    }

    this.setState({ loading: false });
    if (this.formAPI) {
      this.formAPI.reset();
    }
  };

  private setApiRef = (ref: IBSNativeFormAPI) => {
    this.formAPI = ref;
  };
}

export const ApplDepositAddForm = connect(
  null,
  mapDispatchNotifyActions
)(ApplDepositAddFormComponent);

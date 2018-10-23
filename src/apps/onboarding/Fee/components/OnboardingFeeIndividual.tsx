import * as React from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

/* tslint:disable:no-relative-imports */
import '../assets/onboardingEveryPay.sass';

import { IDispatchNotifyActionsProps, mapDispatchNotifyActions } from '@common/core/connectors';
import { saveDataPersistent, saveStepDataPersistent } from '@onboarding/core/actions';
import { IOnboardingStore, IRegistrationFeeData } from '@onboarding/core/types';
import {
  EveryPayForm,
  EveryPayIFrame,
  IEveryPayMessage,
  OnboardingFeeIndividualSuccess,
  OnboardingFeePleaseWait,
} from '@onboarding/Fee/components';
import { getPaymentReference, IEveryPayPaymentReference } from '@onboarding/Fee/services';
import {
  EVERYPAY_CONFIG,
  EVERYPAY_SUCCESS_SUBMIT_DELAY,
  IFRAME_ID,
  ONBOARDING_FEE_AMOUNT,
} from '@onboarding/Fee/values';
import { OnboardingLayout } from '@onboarding/Main/components';
import { IOnboardingStepsContentProps } from '@onboarding/Main/types';

type TPropsMap =
  & IDispatchNotifyActionsProps
  & IOnboardingStepsContentProps
  & IStoreMap
  & IDispatchMap;

interface IStoreMap {
  email: string;
  firstname: string;
  lastname: string;
  savedOrderReference?: string;
  isPaidFee?: boolean;
}

interface IDispatchMap {
  saveData(values: IRegistrationFeeData): void;
  saveSession(): void;
}

interface IStateMap {
  showForm: boolean;
  showSuccess: boolean;
  paymentRef: IEveryPayPaymentReference | null;
}

const { API_ENDPOINT, ACCOUNT_ID, SKIN_NAME, API_USERNAME, API_SECRET } = EVERYPAY_CONFIG;

class OnboardingFeeIndividualComponent extends React.Component<TPropsMap, IStateMap> {

  public state: IStateMap = {
    showForm: false,
    showSuccess: false,
    paymentRef: null,
  };

  public async componentDidMount() {
    const paymentRef = await getPaymentReference(this.props.email);
    const { orderReference } = paymentRef;
    const { savedOrderReference, isPaidFee } = this.props;
    if (savedOrderReference != null && savedOrderReference === orderReference || isPaidFee) {
      this.setState({ paymentRef, showSuccess: true });
    } else {
      this.setState({ paymentRef, showForm: true });
    }
    this.props.saveSession();
  }

  public render() {
    const { paymentRef, showForm, showSuccess } = this.state;
    const { email } = this.props;
    return (
      <OnboardingLayout
        title='Application Fee'
        className='onboarding-panel-scroll-target'
      >
        {() => {
          if (showSuccess) {
            return (<OnboardingFeeIndividualSuccess onContinue={this.submitStep} />);
          }
          if (paymentRef == null) {
            return (<OnboardingFeePleaseWait />);
          }
          const { nonce, orderReference } = paymentRef;
          const { protocol, host } = window.location;
          return showForm
            ? (
              <section className='every-pay__container'>
                <EveryPayForm
                  iframeId={IFRAME_ID}
                  origin={API_ENDPOINT}
                  email={email}
                  amount={ONBOARDING_FEE_AMOUNT}
                  accountID={ACCOUNT_ID}
                  apiUsername={API_USERNAME}
                  apiSecretKey={API_SECRET}
                  nonce={nonce}
                  orderReference={orderReference}
                  skinName={SKIN_NAME}
                  callbackURL={`${protocol}//${host}/callbacks/every-pay`}
                  customerURL={
                    `${protocol}//${host}/onboarding/continue?order-reference=${orderReference}`}
                />
                <EveryPayIFrame
                  id={IFRAME_ID}
                  origin={API_ENDPOINT}
                  onMessage={this.onEveryPayMessage}
                />
              </section>
            )
            : (
              <OnboardingFeePleaseWait />
            );
        }}
      </OnboardingLayout>
    );
  }

  private submitStep: () => void = () => {
    const { paymentRef } = this.state;
    const { saveData, stepSubmit } = this.props;
    if (paymentRef != null) {
      saveData({ orderReference: paymentRef.orderReference });
      stepSubmit();
    }
  }

  private onEveryPayMessage: (data: IEveryPayMessage) => void = (data) => {
    const { transaction_result, message_error, message_title } = data;
    const { paymentRef } = this.state;
    switch (transaction_result) {
      case 'completed': {
        if (paymentRef != null) {
          window.setTimeout(this.submitStep, EVERYPAY_SUCCESS_SUBMIT_DELAY);
        } else {
          this.props.notifyError('Cannot submit step without order reference');
        }
        break;
      }
      default:
      case 'cancelled':
      case 'failed': {
        this.props.notifyError(message_error || message_title);
      }
    }
  }

}

const mapStateToProps: MapStateToProps<IStoreMap, {}, IOnboardingStore> = ({
  account: { email, firstname, lastname },
  registrationData: { payment: { orderReference, isPaidFee } },
}) => ({ email, firstname, lastname, isPaidFee, savedOrderReference: orderReference });

const mapDispatchToProps: MapDispatchToProps<IDispatchNotifyActionsProps & IDispatchMap, {}> = (
  dispatch: ThunkDispatch<IOnboardingStore, never, AnyAction>,
) => ({

  ...mapDispatchNotifyActions(dispatch),

  saveData(values): void {
    dispatch(saveStepDataPersistent('payment', values));
  },

  saveSession(): void {
    dispatch(saveDataPersistent());
  },

});

export const OnboardingFeeIndividual = connect(
  mapStateToProps,
  mapDispatchToProps,
)(OnboardingFeeIndividualComponent);

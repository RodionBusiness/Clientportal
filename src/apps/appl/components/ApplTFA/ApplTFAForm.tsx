import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Col, Row } from 'reactstrap';

import { TFAServiceTestCode, TFAServiceToggleState } from '@appl/components/ApplTFA/services';
import { clientInfoSrviceGetInfo, TClientInfo } from '@appl/core/services/ClientInfo';
import { BSFormGroup, BSInput, BSNativeForm } from '@common/components';
import { IDispatchNotifyActionsProps, mapDispatchNotifyActions } from '@common/core/connectors';

interface IApplTFAFormState {
  loading: boolean;
  clientInfo: TClientInfo | null;
}

type TBSBSApplTFAFormFormData = {
  code?: string;
};

class BSApplTFAFormForm extends BSNativeForm<{}, TBSBSApplTFAFormFormData> { }

export class ApplTFAFormComponent
  extends React.Component<IDispatchNotifyActionsProps, IApplTFAFormState> {

  constructor(props: IDispatchNotifyActionsProps) {
    super(props);

    this.state = {
      loading: false,
      clientInfo: null,
    };
  }

  public async componentDidMount() {
    this.setState({ loading: true });
    this.updateState();
    this.setState({ loading: false });
  }

  public render() {
    const { clientInfo, loading } = this.state;

    return (
      <div className='fixed-width-container--600'>
        <Row>
          <Col className='col-auto'>
            <img className='helper__m-minus-16' alt='barcode' src='/auth.svg' />
          </Col>
          <Col>
            {clientInfo && (
              <div>
                <p><b>Status: </b>
                  <span className={`${clientInfo.requiresTwoFactor ? 'text-success' : 'text-danger'}`}>
                    {clientInfo.requiresTwoFactor ? 'ENABLED' : 'DISABLED'}
                  </span>
                </p>
                <p><b>Secret Key:</b> {clientInfo.twoFactorSecret}</p>
              </div>
            )}

            {clientInfo && !clientInfo.requiresTwoFactor && (
              <BSApplTFAFormForm
                onSubmit={this.onSubmit}
                defaults={{ code: '' }}
              >
                {form => (
                  <div>
                    <BSFormGroup formApi={form} field='code'>
                      <BSInput
                        field='code'
                        type='number'
                        formLabel=''
                        formApi={form}
                        required={true}
                        placeholder='Enter code'
                      />
                    </BSFormGroup>

                    <BSFormGroup>
                      <Button
                        block={true}
                        color='primary'
                        type='submit'
                        disabled={!form.valid() || loading}
                      >
                        Activate
                      </Button>
                    </BSFormGroup>
                  </div>
                )}
              </BSApplTFAFormForm>
            )}

            {clientInfo && clientInfo.requiresTwoFactor && (
              <BSFormGroup>
                <Button
                  block={true}
                  color='primary'
                  type='button'
                  disabled={loading}
                  onClick={this.onDeactivate}
                >
                  Deactivate
                </Button>
              </BSFormGroup>
            )}

            <p>
              <b>To use TWO FACTOR Authentication you will need to download the Google Authenticator App
                to your smartphone.</b>
            </p>

            <p>
              Open the Authenticator on your phone and tap the pencil icon in the top right corner, then tap the
              “+” at the bottom of the screen. This takes you to the “Add Entry” screen. You have a choice of
              either “Scan Barcode” or “Manual Entry”. Select “Scan Barcode”: your camera will be
              activated and you can then take a picture of the QR Code being presented here.
            </p>

            <p>
              The number (it changes every 30 seconds) produced will be required every time you log in to your Clearing
              Account. If you don’t see a QR code please contact us.
           </p>

            <p>
              DO NOT ENABLE TWO FACTOR AUTHENTICATION UNTIL you have gone through this process with the Google
              authenticator. If you enable two factor Authentication and you have not gone through this process
              you will be locked out of your account.
            </p>
          </Col>
        </Row>
      </div>
    );
  }

  private updateState = async () => {
    try {
      const clientInfo = await clientInfoSrviceGetInfo();

      this.setState({
        clientInfo,
      });
    } catch (err) {
      this.props.notifyError(
        `Unable load data: ${err.message || String(err)}`,
      );
    }
  }

  private onSubmit = async (data: TBSBSApplTFAFormFormData) => {
    this.setState({ loading: true });

    try {
      await TFAServiceTestCode(parseInt(data.code || '', 10));
      await TFAServiceToggleState();
      this.updateState();
    } catch (err) {
      this.props.notifyError(
        `${err.message || String(err)}`,
      );
    }

    this.setState({ loading: false });
  }

  private onDeactivate = async () => {
    this.setState({ loading: true });

    try {
      await TFAServiceToggleState();
      this.updateState();
    } catch (err) {
      this.props.notifyError(
        `${err.message || String(err)}`,
      );
    }

    this.setState({ loading: false });
  }
}

export const ApplTFAForm =
  connect(null, mapDispatchNotifyActions)(ApplTFAFormComponent);

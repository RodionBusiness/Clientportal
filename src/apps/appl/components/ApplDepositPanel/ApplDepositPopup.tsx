import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import { TClearingAccount } from '@appl/core/services/LiveOrders';
import { BSIbanFormat } from '@common/components/BSIban';
import { CurrencyFormatter } from '@common/core/helpers';

export interface IApplDepositPopupAPI {
  show(clearingAccount: TClearingAccount | null, depositData: IDepositData): void;
}

interface IApplDepositPopupProps {
  apiRef(popupApi: IApplDepositPopupAPI): void;
}

interface IApplDepositPopupState {
  isOpen: boolean;
  clearingAccount: TClearingAccount | null;
  depositData: IDepositData | null;
}

interface IDepositData {
  currency: string;
  amount: number;
  refID: string;
}

export class ApplDepositPopup extends React.Component<IApplDepositPopupProps, IApplDepositPopupState> {
  public api: IApplDepositPopupAPI = {
    show: (clearingAccount: TClearingAccount, depositData: IDepositData) => this.setState({
      clearingAccount,
      depositData,
      isOpen: true,
    }),
  };

  constructor(props: IApplDepositPopupProps) {
    super(props);

    this.state = {
      isOpen: false,
      clearingAccount: null,
      depositData: null,
    };
  }

  public componentDidMount() {
    const { apiRef } = this.props;

    if (apiRef) {
      apiRef(this.api);
    }
  }

  public render() {
    const { clearingAccount, depositData, isOpen } = this.state;

    return (
      <div>
        <Modal isOpen={isOpen} toggle={this.toggle} autoFocus={false}>
          <ModalHeader toggle={this.toggle}>Payment instructions</ModalHeader>

          <ModalBody>
            {(clearingAccount && depositData) &&
              <div>
                <div className='row'>
                  <div className='col-sm-12 mb-1 mt-2'>
                    <h4>Payment details</h4>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-sm-4'><span>Account Owner</span></div>
                  <div className='col-sm-7'>
                    {clearingAccount.entityName}
                  </div>
                </div>

                <div className='row'>
                  <div className='col-sm-4'><span>Address</span></div>
                  <div className='col-sm-7'>
                    {clearingAccount.entityAddress}
                  </div>
                </div>

                <div className='row'>
                  <div className='col-sm-4'><span>Postal code</span></div>
                  <div className='col-sm-7'>
                    {clearingAccount.entityPostCode}
                  </div>
                </div>

                <div className='row'>
                  <div className='col-sm-4'><span>City</span></div>
                  <div className='col-sm-7'>
                    {clearingAccount.entityCity}
                  </div>
                </div>

                <div className='row'>
                  <div className='col-sm-4'><span>Country</span></div>
                  <div className='col-sm-7'>
                    {clearingAccount.entityCountry}
                  </div>
                </div>

                <div className='row'>
                  <div className='col-sm-12 mb-1 mt-2'>
                    <h4 className='pt-3'>Payment details</h4>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-sm-4'><span>IBAN</span></div>
                  <BSIbanFormat className='col-sm-7'>
                    {clearingAccount.iban}
                  </BSIbanFormat>
                </div>

                <div className='row'>
                  <div className='col-sm-4'><span>BIC/SWIFT</span></div>
                  <div className='col-sm-7'>
                    {clearingAccount.paymentBicSwift}
                  </div>
                </div>

                <div className='row'>
                  <div className='col-sm-4'><span>Currency</span></div>
                  <div className='col-sm-7'>
                    {depositData.currency}
                  </div>
                </div>

                <div className='row'>
                  <div className='col-sm-4'><span>Amount</span></div>
                  <div className='col-sm-7'>
                    {CurrencyFormatter.format(depositData.amount)}
                  </div>
                </div>

                <div className='row'>
                  <div className='col-sm-4'><span>Deposit Reference</span></div>
                  <div className='col-sm-7 text-danger'>
                    {depositData.refID}
                  </div>
                </div>

                <div className='row'>
                  <div className='col-sm-4'><span>Beneficiary</span></div>
                  <div className='col-sm-7'>
                    BlockSettle AB
                  </div>
                </div>

                <div className='row'>
                  <div className='col-sm-12 mb-1 mt-2'>
                    <h4 className='pt-3'>Bank details</h4>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-sm-4'><span>Bank Name</span></div>
                  <div className='col-sm-7'>
                    {clearingAccount.bankName}
                  </div>
                </div>

                <div className='row'>
                  <div className='col-sm-4'><span>Address</span></div>
                  <div className='col-sm-7'>
                    {clearingAccount.bankAddress}
                  </div>
                </div>

                <div className='row'>
                  <div className='col-sm-4'><span>City</span></div>
                  <div className='col-sm-7'>
                    {clearingAccount.bankCity}
                  </div>
                </div>

                <div className='row'>
                  <div className='col-sm-4'><span>Country</span></div>
                  <div className='col-sm-7'>
                    {clearingAccount.bankCountry}
                  </div>
                </div>

                <div className='row'>
                  <div className='col-sm-4'><span>BIC/SWIFT</span></div>
                  <div className='col-sm-7'>
                    {clearingAccount.bankBicSwift}
                  </div>
                </div>
              </div>
            }
          </ModalBody>

          <ModalFooter>
            <Button onClick={this.toggle}>Close</Button>
          </ModalFooter>
        </Modal>
      </div >
    );
  }

  private toggle = () => (
    this.setState({
      isOpen: !this.state.isOpen,
    })
  )
}

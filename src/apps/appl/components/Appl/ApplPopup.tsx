import React from 'react';
import { Modal, ModalHeader } from 'reactstrap';

export { ModalBody as ApplModalBody, ModalFooter as ApplModalFooter } from 'reactstrap';

export interface IApplPopupAPI {
  show(data?: any, onClose?: () => void): void;
  data(): any | undefined;
  toggle(): void;
  isOpen(): boolean;
  hide(): void;
}

export interface IApplPopupProps {
  title: React.ReactNode;
  children(popupApi: IApplPopupAPI, data: any): React.ReactNode | null;
  apiRef?(popupApi: IApplPopupAPI): void;
}

interface IApplPopupState {
  isOpen: boolean;
  data: any;
  onClose?: () => void;
}

export class ApplPopup extends React.Component<IApplPopupProps, IApplPopupState> {
  public state: IApplPopupState = {
    isOpen: false,
    data: null
  };

  public popupApi: IApplPopupAPI = {
    show: (data: any, onClose?: () => void) =>
      this.setState({
        data,
        isOpen: true,
        onClose: onClose
      }),
    data: () => this.state.data,
    isOpen: () => this.state.isOpen,
    toggle: () =>
      this.setState(({ isOpen }) => ({
        isOpen: !isOpen
      })),
    hide: () => this.setState({ isOpen: false })
  };

  public componentDidMount() {
    const { apiRef } = this.props;

    if (apiRef) {
      apiRef(this.popupApi);
    }
  }

  public render() {
    const { children, title } = this.props;
    const { data } = this.state;
    const popupApi = this.popupApi;

    return (
      <Modal
        isOpen={popupApi.isOpen()}
        toggle={popupApi.toggle}
        autoFocus={false}
        onClosed={this.onClosed}
      >
        <ModalHeader toggle={popupApi.toggle}>{title}</ModalHeader>

        {children(this.popupApi, data)}
      </Modal>
    );
  }

  onClosed = () => {
    if (this.state.onClose) {
      this.state.onClose();
    }
  };
}

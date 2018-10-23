import * as React from 'react';
import { Input, InputProps } from 'reactstrap';

import { BSFormLabel, IBSNativeFormAPI, TInputValue } from '@common/components/BSForms';
import { iban } from '@common/core/helpers';

export interface IBSIbanInputProps extends InputProps<{}>{
  formApi: IBSNativeFormAPI;
  field: string;
  value?: string;
  formLabel?: React.ReactNode;
  onFinishInput?(value: TInputValue): void;
  onValueChange?(value: TInputValue): void;
}

export interface IBSIbanInputState {
  isValidIban: boolean;
}

export class BSIbanInput extends React.Component<IBSIbanInputProps> {

  public state = {
    isValidIban: false,
  };

  private selection: number = 0;
  private inputElement?: HTMLInputElement;
  private lastCheckedIban?: string;

  public componentDidUpdate(): void {
    this.restoreSelection();
  }

  public render(): React.ReactNode {
    const { isValidIban } = this.state;
    const { children, formLabel, formApi, field, onFinishInput, ...rest } = this.props;

    return (
      <div>
        {formLabel && (
          <BSFormLabel>{formLabel}</BSFormLabel>
        )}
        <Input
          innerRef={this.saveInput}
          value={this.getPrintIbanValue()}
          onChange={this.refresh}
          onBlur={this.finishInput}
          onKeyDown={this.handleKeyDown}
          type={'text' as any}
          name={field}
          {...rest}
        />
        {!isValidIban && formApi.touched(field) && children}
      </div>
    );
  }

  private getPrintIbanValue = (): string => {
    const { value, formApi, field } = this.props;

    return iban.printFormat(value || formApi.stringValue(field));
  }

  private handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      this.finishInput();
    }
  }

  private finishInput = (): void => {
    const { isValidIban } = this.state;
    const { formApi, field, onFinishInput } = this.props;
    const value = formApi.value(field);
    if (!value || value === '') {
      this.setState({ isValidIban: false });
    }
    if (!isValidIban || value === this.lastCheckedIban) {
      return;
    }
    formApi.touch(field);
    this.lastCheckedIban = `${value}`;
    if (typeof onFinishInput === 'function') {
      onFinishInput(value);
    }
  }

  private refresh = (): void => {
    if (!this.inputElement) {
      return;
    }
    const { formApi, field } = this.props;
    this.validateIban();
    this.saveSelection();
    formApi.setValue(field, iban.electronicFormat(this.inputElement.value));
    formApi.onChangeInput(field, this.electronicIbanWrapper);
  }

  private validateIban = (): void => {
    if (!this.inputElement) {
      return;
    }
    const isValidIban = iban.isValid(this.inputElement.value);
    this.setState({ isValidIban });
    this.inputElement.setCustomValidity(isValidIban ? '' : 'Invalid IBAN');
  }

  private electronicIbanWrapper = (): void => {
    const { formApi, field, onValueChange } = this.props;
    if (typeof onValueChange !== 'function') {
      return;
    }
    onValueChange(formApi.value(field));
  }

  private saveInput = (input: HTMLInputElement) => {
    this.inputElement = input;
  }

  private saveSelection = (): void => {
    if (!this.inputElement) {
      return;
    }
    const { value, selectionStart } = this.inputElement;
    const beforeSelection = value.slice(0, (selectionStart != null) ? selectionStart : undefined);
    this.selection = iban.printFormat(beforeSelection).length;
  }

  private restoreSelection = (): void => {
    if (!this.inputElement) {
      return;
    }
    this.inputElement.selectionStart = this.selection;
    this.inputElement.selectionEnd = this.selection;
  }

}

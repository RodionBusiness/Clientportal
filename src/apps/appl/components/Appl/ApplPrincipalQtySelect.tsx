import React from 'react';

import { applPrincipalQtyService } from '@appl/components/Appl/services';
import { applOptionMapper } from '@appl/core/mappers';
import { BSSelect, IBSNativeFormAPI, TOption } from '@common/components';

interface IApplPrincipalQtySelectPrpos {
  formApi: IBSNativeFormAPI;
  field: string;
  label: string;
}

interface IApplPrincipalQtySelectState {
  options: TOption[];
}

export class ApplPrincipalQtySelect extends
  React.Component<IApplPrincipalQtySelectPrpos, IApplPrincipalQtySelectState> {

  public state: IApplPrincipalQtySelectState = {
    options: [],
  };

  public async componentDidMount(): Promise<void> {
    const currencies = await applPrincipalQtyService.getClientFeeCurrencies();
    this.setState({
      options: currencies.map(applOptionMapper.mapFromCurrency),
    });
  }

  public render() {
    return !this.hasOptions()
      ? null
      : (
        <BSSelect
          formApi={this.props.formApi}
          field={this.props.field}
          label={this.props.label}
          options={this.state.options}
        />
      );
  }

  private hasOptions(): boolean {
    return this.state.options.length !== 0;
  }

}

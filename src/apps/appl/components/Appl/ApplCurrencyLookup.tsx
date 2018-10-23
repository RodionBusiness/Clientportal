import * as React from 'react';
import {
  ChangeEvent,
  default as Autosuggest,
  InputProps as SuggestionsInputProps,
  SuggestionsFetchRequest,
} from 'react-autosuggest';

import '@appl/styles/appl-currency-lookup.sass';

import { genoaCurrencyLookup } from '@appl/core/services/ClientControl';
import { TCurrencies, TCurrency } from '@appl/core/types';
import { IBSNativeFormAPI } from '@common/components';

interface IApplCurrencyLookupPrpos {
  formApi: IBSNativeFormAPI;
  field: string;
}

interface IApplCurrencyLookupState {
  filter: string;
  currencies: TCurrencies;
}

export class ApplCurrencyLookup extends React.Component<IApplCurrencyLookupPrpos, IApplCurrencyLookupState> {
  public state: IApplCurrencyLookupState = {
    currencies: [],
    filter: '',
  };

  private theme: object = {
    container:                'appl-currency-lookup__container',
    containerOpen:            'appl-currency-lookup__container--open',
    input:                    'form-control appl-currency-lookup__input',
    inputOpen:                'appl-currency-lookup__input--open',
    inputFocused:             'appl-currency-lookup__input--focused',
    suggestionsContainer:     'appl-currency-lookup__suggestions-container',
    suggestionsContainerOpen: 'appl-currency-lookup__suggestions-container--open',
    suggestionsList:          'appl-currency-lookup__suggestions-list',
    suggestion:               'appl-currency-lookup__suggestion',
    suggestionFirst:          'appl-currency-lookup__suggestion--first',
    suggestionHighlighted:    'appl-currency-lookup__suggestion--highlighted',
    sectionContainer:         'appl-currency-lookup__section-container',
    sectionContainerFirst:    'appl-currency-lookup__section-container--first',
    sectionTitle:             'appl-currency-lookup__section-title',
  };

  public render() {
    const { currencies, filter } = this.state;

    const inputProps: SuggestionsInputProps = {
      placeholder: 'Currency',
      value: filter,
      onChange: this.onCurrencyFilterValueChange,
    };

    return (
      <Autosuggest
        suggestions={currencies}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
        theme={this.theme}
      />
    );
  }

  private renderSuggestion = ({ label }: TCurrency) =>
    <span>{label}</span>

  private getSuggestionValue = ({ label }: TCurrency) =>
    label

  private onCurrencyFilterValueChange = (_: any, { newValue }: ChangeEvent) => {
    const newValueLocal = String(newValue || '').toLocaleLowerCase();

    const currency = this.state.currencies
      .find(({ label }) => label.toLocaleLowerCase() === newValueLocal);

    this.props.formApi.setValue(
      this.props.field,
      currency ? String(currency.value) : '',
    );

    this.setState({
      filter: currency ? currency.label : newValue,
    });
  }

  private onSuggestionsFetchRequested = async ({ value }: SuggestionsFetchRequest) =>
    this.setState({ currencies: value ? await genoaCurrencyLookup(value) : [] })

  private onSuggestionsClearRequested = () =>
    this.setState({ currencies: [] })
}

import { Map } from 'immutable';
import * as React from 'react';

import { IDocument } from '@common/core/types';

export type TInputValue = string | boolean | undefined | IDocument;

interface IBSNativeFormState {
  touched: Map<string, boolean>;
  values: Map<string, TInputValue>;
}

export interface IBSNativeFormAPI {
  touched(name?: string): boolean;
  value(name: string): TInputValue;
  setValue(name: string, value: TInputValue, needForceUpdate?: boolean): void;
  stringValue(name: string): string;
  numberValue(name: string): number;
  touch(name: string): any;
  onChangeInput(
    name: string,
    onChangeCallback?: (value: TInputValue, field: string) => void,
  ): (evt: React.SyntheticEvent<HTMLInputElement>) => void;
  valid(): boolean;
  reset(): void;
}

export interface IBSNativeFormDefaults {
  [key: string]: TInputValue;
}

export class BSNativeForm<P, V> extends React.Component<{
  defaults: IBSNativeFormDefaults;
  className?: string;
  onSubmit(values: V, evt: React.SyntheticEvent<HTMLFormElement>): void;
  onChange?(values: V, isFormValid: boolean): void;
  children(formApi: IBSNativeFormAPI, values: V): JSX.Element | null;
  apiRef?(formApi: IBSNativeFormAPI): void;
} & P, IBSNativeFormState> {
  public state = {
    touched: Map<string, boolean>(),
    values: Map<string, TInputValue>(),
  };

  public form: React.RefObject<HTMLFormElement> = React.createRef();

  /**
   * Public API
   */

  public api: IBSNativeFormAPI = {
    touched: name => name ?
      Boolean(this.state.touched.get(name)) :
      Boolean(this.state.touched.some(Boolean)),

    value: name => this.state.values.get(name),

    stringValue: name => String(this.state.values.get(name) || ''),

    numberValue: name => Number(this.state.values.get(name)),

    setValue: (name, value, needForceUpdate?: boolean) => {
      this.setState(({ touched, values }) => ({
        touched: touched.set(name, true),
        values: values.set(name, value),
      }));

      if (needForceUpdate) {
        this.callForceUpdate();
      }

      this.onChange();
    },

    touch: name =>
      this.setState.bind(
        this,
        ({ touched }: IBSNativeFormState) => ({
          touched: touched.set(name, true),
        }),
        void 0,
      ),

    onChangeInput: (name, onChangeCallback) =>
      (evt: React.SyntheticEvent<HTMLInputElement>) => {
        let value: TInputValue;
        let needForceUpdate = false;
        const element = evt.currentTarget;

        if (element.nodeName === 'SELECT') {
          needForceUpdate = true;
        }

        switch (element.type) {
          case 'radio':
            value = typeof this.props.defaults[name] === 'boolean' ?
              element.checked :
              element.value;
            needForceUpdate = true;
            break;

          case 'checkbox':
            value = element.checked;
            break;

          default: value = element.value;
        }

        this.setState(({ touched, values }) => ({
          values: values.set(name, value),
          touched: touched.set(name, true),
        }));

        if (onChangeCallback) {
          onChangeCallback(value, name);
        }

        if (needForceUpdate) {
          this.callForceUpdate();
        }

        this.onChange();
      },

    valid: () => {
      return Boolean(
        this.form.current &&
        Array.from(this.form.current.elements)
          .filter(BSNativeForm.isFormHtmlElement)
          .every(element => element.validity.valid && !element.validity.customError),
      );
    },

    reset: () => {
      this.resetFormValues();
      this.resetFormTouches();
      this.onChange();
    },
  };

  private onChangeTid?: number;

  private forceUpdateTid?: number;

  public static isFormHtmlElement(
    element?: any,
  ): element is HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement {
    return element != null && (
      element instanceof HTMLInputElement ||
      element instanceof HTMLSelectElement ||
      element instanceof HTMLTextAreaElement ||
      element instanceof NodeList
    );
  }

  /**
   * Copy defaults to inner values
   */
  public componentDidMount() {
    this.resetFormValues();

    const { apiRef } = this.props;
    if (apiRef) {
      apiRef(this.api);
    }

    // Fix initial form validation state.
    this.callForceUpdate();

    this.onChange();
  }

  /**
   * Render
   */

  public render() {
    const { children, className } = this.props;

    return (
      <form
        onSubmit={this.onSubmit}
        ref={this.form}
        className={className || ''}
      >
        {children(this.api, this.getValues())}
      </form>
    );
  }

  /**
   * Private logic
   */

  private resetFormValues() {
    this.setState(({ values }) => {
      const { defaults } = this.props;
      let valuesClone = values.toMap();

      Object.keys(defaults).forEach((key) => {
        valuesClone = valuesClone.set(key, defaults[key]);
      });

      return { values: valuesClone };
    });
  }

  private resetFormTouches() {
    this.setState({
      touched: Map<string, boolean>(),
    });
  }

  private onSubmit = (evt: React.SyntheticEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (this.api.valid()) {
      this.props.onSubmit(this.getValues(), evt);
    }
  }

  private getValues(): any {
    const { defaults } = this.props;
    const { values } = this.state;
    const data = values.toJSON();

    Object.keys(defaults).forEach((key) => {
      if (!values.has(key)) {
        data[key] = defaults[key];
      }
    });

    return data;
  }

  private callForceUpdate() {
    window.clearTimeout(this.forceUpdateTid);
    this.forceUpdateTid = window.setTimeout(() => this.forceUpdate(), 50);
  }

  private onChange() {
    clearTimeout(this.onChangeTid);

    this.onChangeTid = window.setTimeout(
      () => {
        const { onChange } = this.props;

        if (onChange) {
          onChange(this.getValues(), this.api.valid());
        }
      },
      300,
    );
  }
}

import * as IBAN from 'iban';

export class Iban {

  public readonly separator: string;

  constructor(separator = ' ') {
    this.separator = separator;
  }

  public electronicFormat(value: string): string {
    return IBAN.electronicFormat(value);
  }

  public printFormat(value: string, separator = this.separator): string {
    return IBAN.printFormat(value, separator);
  }

  public isValid(value: string): boolean {
    return IBAN.isValid(value);
  }

}

export const iban = new Iban();

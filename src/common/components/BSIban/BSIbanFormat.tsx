import React from 'react';

import { iban, trimClassName } from '@common/core/helpers';

interface IFormatIBANProps {
  children: string;
  className?: string;
  separator?: string;
}

export const BSIbanFormat: React.StatelessComponent<IFormatIBANProps> = ({
  children,
  className = '',
  separator = ' ',
}) => (
  <span
    className={trimClassName(className)}
  >
    {iban.printFormat(children, separator)}
  </span>
);

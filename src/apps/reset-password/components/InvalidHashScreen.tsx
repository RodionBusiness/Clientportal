import * as React from 'react';
import { Link } from 'react-router-dom';

import { SmallLayoutContainer } from '@common/components';

interface IInvalidHashScreenPros {
  title: string;
  link: string;
  linkLabel: React.ReactNode;
}

export const InvalidHashScreen: React.StatelessComponent<IInvalidHashScreenPros> = ({
  title,
  link,
  linkLabel,
}) => (
  <SmallLayoutContainer title={title}>
    <Link to={link} className='btn btn-primary btn-block'>
      {linkLabel}
    </Link>
  </SmallLayoutContainer>
);

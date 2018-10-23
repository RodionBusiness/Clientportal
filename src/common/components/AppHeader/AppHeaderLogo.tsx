import * as React from 'react';

export type TLogoSize = 50 | 80 | 100;

const bsLogoSrcs: { [ key: number ]: string } = {
  50: require('@common/assets/images/bs-logo-50.png'),
  80: require('@common/assets/images/bs-logo-80.png'),
  100: require('@common/assets/images/bs-logo-100.png'),
};

interface IAppHeaderLogoProps {
  size: TLogoSize;
  href?: string;
}

export const AppHeaderLogo: React.StatelessComponent<IAppHeaderLogoProps> = ({
  size,
  href = '/',
}) => (
  <a href={href}>
    <img src={bsLogoSrcs[size]} alt='BlockSettle' />
  </a>
);

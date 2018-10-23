import React from 'react';

type IBSPlayMarketButtonProps = React.HTMLProps<HTMLButtonElement>;

export class BSPlayMarketButton extends React.Component<IBSPlayMarketButtonProps> {
  render() {
    const buttonProps: any = {};
    const { className } = this.props;

    Object.entries(this.props).forEach((keyVal: Array<any>) => {
      const key = keyVal[0],
        val = keyVal[1];

      if (key === 'children' || key === 'className') return;

      buttonProps[key] = val;
    });

    return (
      <a
        {...buttonProps}
        className={`btn btn-store ${className}`}
        href="https://play.google.com/store/apps/details?id=com.verisec.mobile.frejaeid"
        target="__blank"
      >
        <i className="btn-store__icon fa fa-google" />
        <span className="btn-store__text">Get it on</span>
        <span className="btn-store__name">Google Play</span>
      </a>
    );
  }
}

import React from 'react';

type IBSAppStoreButtonProps = React.HTMLProps<HTMLButtonElement>;

export class BSAppStoreButton extends React.Component<IBSAppStoreButtonProps> {
  render() {
    const buttonProps: any = {};

    Object.entries(this.props).forEach((keyVal: Array<any>) => {
      const key = keyVal[0],
        val = keyVal[1];

      if (key === 'children') return;

      buttonProps[key] = val;
    });

    return (
      <a
        {...buttonProps}
        className="btn btn-store"
        href="https://itunes.apple.com/us/app/freja-eid/id1256552092"
        target="__blank"
      >
        <i className="btn-store__icon fa fa-apple" />
        <span className="btn-store__text">Download on the</span>
        <span className="btn-store__name">App Store</span>
      </a>
    );
  }
}

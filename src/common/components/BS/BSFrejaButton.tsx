import React from 'react';
import { Button, CSSModule } from 'reactstrap';
import { BSSpinner } from '@common/components/BS/BSSpinner';
import { frejaIconBlueSmSrc } from '@common/values/icons';

interface IBSFrejaButtonProps extends React.HTMLProps<HTMLButtonElement> {
  loading?: boolean;
  outline?: boolean;
  active?: boolean;
  block?: boolean;
  color?: string;
  disabled?: boolean;
  tag?: React.ReactType;
  innerRef?: string | ((instance: HTMLButtonElement) => any);

  onClick?: React.MouseEventHandler<any>;
  size?: any;
  id?: string;
  style?: React.CSSProperties;

  cssModule?: CSSModule;
}

export class BSFrejaButton extends React.Component<IBSFrejaButtonProps> {
  render() {
    const { children, loading } = this.props;
    const buttonProps: any = {};

    Object.entries(this.props).forEach((keyVal: Array<any>) => {
      const key = keyVal[0],
        val = keyVal[1];

      if (key === 'loading' || key === 'children') return;
      buttonProps[key] = val;
    });

    return (
      <Button {...buttonProps} color="freja">
        {loading ? (
          <div className="btn-freja__icon">
            <BSSpinner spin={true} className="mr-2" />
          </div>
        ) : (
          <img className="btn-freja__icon" src={frejaIconBlueSmSrc} />
        )}
        <span className="btn-freja__text">{children}</span>
      </Button>
    );
  }
}

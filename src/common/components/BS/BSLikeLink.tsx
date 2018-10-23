import * as React from 'react';

interface IBSLikeLinkProps {
  children: React.ReactNode;
  onClick?(evt: React.SyntheticEvent<HTMLElement>): void;
}

export const BSLikeLink = (props: IBSLikeLinkProps) => (
  <span className='helper__like-link' onClick={props.onClick} {...props} role='link'>
    <u>{props.children}</u>
  </span>
);

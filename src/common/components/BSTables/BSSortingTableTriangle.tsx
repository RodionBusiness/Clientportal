import * as React from 'react';

interface IBSSortingTableTriangleProps {
  asc: boolean;
  active: boolean;
}

export const BSSortingTableTriangle = ({ asc, active }: IBSSortingTableTriangleProps) => (
  <span
    className={`
      ${active && 'bs-table__sorting-triangle--active'}
      bs-table__sorting-triangle
    `}
  >
    {asc ? <span> &#9650;</span> : <span> &#9660;</span>}
  </span>
);

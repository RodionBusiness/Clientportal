import * as React from 'react';
import { Table } from 'reactstrap';

import '@common/styles/components/bs-table.sass';

import { BSSortingTableTriangle } from '@common/components/BSTables';
import { formatFieldValue } from '@common/core/helpers';
import { IReadOnlyTable, ITableFieldMetaData } from '@common/core/types';

export type TBSTableLayout = 'auto' | 'fixed';

interface IBSReadOnlyTableProps {
  table: IReadOnlyTable;
  tableLayout?: TBSTableLayout;
  sortBy?: string;
  sortAsc?: boolean;
  onLabelClick?(field: ITableFieldMetaData): void;
  onRowClick?(rowData: Object): void;
}

/**
 * BSReadOnlyTable render IReadOnlyTable structure using own style
 */
export const BSReadOnlyTable: React.StatelessComponent<IBSReadOnlyTableProps> = ({
  table: {
    fields,
    data,
  },
  sortBy,
  sortAsc,
  onLabelClick,
  onRowClick,
  tableLayout = 'fixed',
}) => (
  <Table
    className={`bs-table bs-table--ro bs-table--layout-${tableLayout}`}
    hover={true}
    size='sm'
  >
    <thead>
      <tr>
        {fields.map((field, key) => (
          <th
            key={key}
            onClick={onLabelClick && onLabelClick.bind(null, field)}
            className={`
              bs-table__th
              ${field.sortKey && 'bs-table__th--sortable'}
            `}
          >
            {field.label || field.fieldName}
            {field.sortKey && (
              <BSSortingTableTriangle
                active={sortBy === field.sortKey}
                asc={sortBy === field.sortKey && sortAsc || false}
              />
            )}
          </th>
        ))}
      </tr>
    </thead>

    <tbody>
      {data.map((item, itemKey) => (
        <tr
          key={itemKey}
          className={`${onRowClick && 'bs-table__tr--clickable' || ''}`}
          onClick={onRowClick && onRowClick.bind(null, item)}
        >
          {fields.map((field, key) => (
            <td key={key} className='bs-table__td'>
              {formatFieldValue(field, item[field.fieldName], item, fields)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </Table>
);

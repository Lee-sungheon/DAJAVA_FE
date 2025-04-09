'use client';

import { css } from '@dajava/styled-system/css';

import { IRegisterInfo } from '../../apis/admin/getAdminRegisters';
import { MANAGEMENT_TABLE_HEADERS } from '../../constants/management';

import ManagementTableRow from './ManagementTableRow';

interface ManagementTableProps {
  data: IRegisterInfo[];
}

const ManagementTable = ({ data }: ManagementTableProps) => {
  return (
    <div
      className={css({
        w: 'full',
        bg: 'white',
        borderRadius: 'xl',
        overflow: 'hidden',
        boxShadow: '1px 0.5px 4px 1px #00000040',
      })}
    >
      <table className={css({ w: 'full', textAlign: 'left' })}>
        <thead>
          <tr
            className={css({
              bg: 'gray.50',
              borderBottom: '1px solid',
              borderColor: 'gray.200',
            })}
          >
            {MANAGEMENT_TABLE_HEADERS.map((header) => (
              <th key={header.key} className={css({ p: '4', fontWeight: 'semibold', color: 'gray.600' })}>
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <ManagementTableRow key={index} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

ManagementTable.displayName = 'ManagementTable';

export default ManagementTable;

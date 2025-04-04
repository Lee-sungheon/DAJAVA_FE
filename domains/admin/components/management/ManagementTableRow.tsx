'use client';

import { css } from '@dajava/styled-system/css';

import StatusBadge from './StatusBadge';

import type { ISolutionData } from '../../types/management';

interface ManagementTableRowProps {
  item: ISolutionData;
}

const ManagementTableRow = ({ item }: ManagementTableRowProps) => {
  return (
    <tr
      className={css({
        borderBottom: '1px solid',
        borderColor: 'gray.200',
        _hover: { bg: 'gray.50' },
      })}
    >
      <td className={css({ p: '4', color: 'gray.700' })}>{item.email}</td>
      <td className={css({ p: '4', color: 'gray.700' })}>{item.applicationDate}</td>
      <td className={css({ p: '4', color: 'gray.700' })}>{item.startDate}</td>
      <td className={css({ p: '4', color: 'gray.700' })}>{item.endDate}</td>
      <td className={css({ p: '4', color: 'gray.700' })}>{item.domain}</td>
      <td className={css({ p: '4' })}>
        <StatusBadge status={item.solutionStatus} />
      </td>
      <td className={css({ p: '4' })}>
        <StatusBadge status={item.progressStatus} />
      </td>
    </tr>
  );
};

ManagementTableRow.displayName = 'ManagementTableRow';

export default ManagementTableRow;

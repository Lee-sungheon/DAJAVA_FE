'use client';

import { css } from '@dajava/styled-system/css';

import { IRegisterInfo } from '../../apis/admin/getAdminRegisters';
import { getFormattedDate } from '../../utils/management';

import StatusBadge from './StatusBadge';

interface ManagementTableRowProps {
  item: IRegisterInfo;
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
      <td className={css({ p: '4', color: 'gray.700' })}>{getFormattedDate(item.solutionDate)}</td>
      <td className={css({ p: '4', color: 'gray.700' })}>{getFormattedDate(item.solutionStartDate)}</td>
      <td className={css({ p: '4', color: 'gray.700' })}>{getFormattedDate(item.solutionEndDate)}</td>
      <td className={css({ p: '4', color: 'gray.700' })}>{item.url}</td>
      <td className={css({ p: '4' })}>
        <StatusBadge status={item.completed ? 'COMPLETED' : 'IN_PROGRESS'} />
      </td>
      <td className={css({ p: '4' })}>
        <StatusBadge status={item.eventState} />
      </td>
    </tr>
  );
};

ManagementTableRow.displayName = 'ManagementTableRow';

export default ManagementTableRow;

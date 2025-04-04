import { styled } from '@dajava/styled-system/jsx';

import type { TStatusType } from '../../types/management';

interface StatusBadgeProps {
  status: TStatusType;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  return <Badge status={status}>{status}</Badge>;
};

const Badge = styled('span', {
  base: {
    display: 'inline-block',
    textAlign: 'center',
    px: '3',
    py: '1',
    rounded: 'full',
    fontSize: 'sm',
  },
  variants: {
    status: {
      Pending: {
        bg: 'red.100',
        color: 'red.700',
      },
      Complete: {
        bg: 'green.100',
        color: 'green.700',
      },
      'In Progress': {
        bg: 'blue.100',
        color: 'blue.700',
      },
      Rejected: {
        bg: 'gray.100',
        color: 'gray.700',
      },
    },
  },
  defaultVariants: {
    status: 'Rejected',
  },
});

StatusBadge.displayName = 'StatusBadge';

export default StatusBadge;

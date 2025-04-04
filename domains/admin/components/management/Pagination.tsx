'use client';

import { styled } from '@dajava/styled-system/jsx';
import { flex } from '@dajava/styled-system/patterns';

import { getPageRange, getVisiblePages } from '../../utils/management';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const { startPage, endPage } = getVisiblePages(currentPage, totalPages);
  const showStartEllipsis = startPage > 2;
  const showEndEllipsis = endPage < totalPages - 1;

  return (
    <PaginationContainer>
      <PaginationButton
        isActive={false}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        {'<'}
      </PaginationButton>

      {startPage > 1 && (
        <PaginationButton key={1} isActive={false} onClick={() => onPageChange(1)}>
          {'1'}
        </PaginationButton>
      )}
      {showStartEllipsis && (
        <span key={'start-ellipsis'} className={flex({ alignItems: 'flex-end', pb: '2' })}>
          {'...'}
        </span>
      )}
      {getPageRange(startPage, endPage).map((page) => (
        <PaginationButton key={page} isActive={currentPage === page} onClick={() => onPageChange(page)}>
          {page}
        </PaginationButton>
      ))}
      {showEndEllipsis && (
        <span key={'end-ellipsis'} className={flex({ alignItems: 'flex-end', pb: '2' })}>
          {'...'}
        </span>
      )}
      {endPage < totalPages && (
        <PaginationButton key={totalPages} isActive={false} onClick={() => onPageChange(totalPages)}>
          {totalPages}
        </PaginationButton>
      )}

      <PaginationButton
        isActive={false}
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        {'>'}
      </PaginationButton>
    </PaginationContainer>
  );
};

const PaginationContainer = styled('div', {
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2',
    mt: '4',
  },
});

const PaginationButton = styled('button', {
  base: {
    px: '3',
    py: '2',
    rounded: 'md',
    fontWeight: 'medium',
    transition: 'all 0.2s',
    minW: '8',
  },
  variants: {
    isActive: {
      true: {
        bg: 'orange.500',
        color: 'white',
        _hover: { bg: 'orange.600' },
      },
      false: {
        bg: 'transparent',
        color: 'gray.600',
        _hover: { bg: 'gray.100' },
      },
    },
  },
});

Pagination.displayName = 'Pagination';

export default Pagination;

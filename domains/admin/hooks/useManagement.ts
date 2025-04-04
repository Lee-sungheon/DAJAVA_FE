'use client';

import { useMemo, useState } from 'react';

import { MOCK_SOLUTIONS } from '../constants/management';

import type { ISolutionData } from '../types/management';

const ITEMS_PER_PAGE = 5;

export const useManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data] = useState<ISolutionData[]>([...MOCK_SOLUTIONS]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return data.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, data]);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    data: paginatedData,
    currentPage,
    totalPages,
    handlePageChange,
  };
};

export default useManagement;

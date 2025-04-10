'use client';

import { useState } from 'react';

import { useGetAdminRegisters } from '../apis/admin/getAdminRegisters';

const ITEMS_PER_PAGE = 10;

export const useManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: adminRegisters } = useGetAdminRegisters({
    pageNum: currentPage - 1,
    pageSize: ITEMS_PER_PAGE,
  });

  const totalPages = adminRegisters[0]?.totalPages;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    data: adminRegisters.flatMap((page) => page.registerInfos),
    currentPage,
    totalPages,
    handlePageChange,
  };
};

export default useManagement;

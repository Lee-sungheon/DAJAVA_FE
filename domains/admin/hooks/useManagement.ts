'use client';

import { useState } from 'react';

import { useGetAdminRegisters } from '../apis/admin/getAdminRegisters';

const ITEMS_PER_PAGE = 2;

export const useManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: adminRegisters } = useGetAdminRegisters({
    pageNum: currentPage - 1,
    pageSize: ITEMS_PER_PAGE,
  });

  console.log(adminRegisters);

  const totalPages = 20;
  // const totalPages = Math.ceil(adminRegisters.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    data: adminRegisters,
    currentPage,
    totalPages,
    handlePageChange,
  };
};

export default useManagement;

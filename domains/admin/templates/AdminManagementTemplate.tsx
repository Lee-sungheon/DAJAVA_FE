'use client';

import { css } from '@dajava/styled-system/css';

import ManagementTable from '../components/management/ManagementTable';
import Pagination from '../components/management/Pagination';
import useManagement from '../hooks/useManagement';

const AdminManagementTemplate = () => {
  const { data, currentPage, totalPages, handlePageChange } = useManagement();

  return (
    <>
      <h2
        className={css({
          w: 'full',
          fontSize: '40px',
          fontWeight: 800,
          marginBottom: '24px',
          textShadow: '0px 4px 4px #00000040',
        })}
      >
        {'관리 페이지'}
      </h2>
      <ManagementTable data={data} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </>
  );
};

AdminManagementTemplate.displayName = 'AdminManagementTemplate';

export default AdminManagementTemplate;

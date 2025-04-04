import AdminTopNavigation from '@dajava/components/layouts/AdminTopNavgation';
import { flex } from '@dajava/styled-system/patterns';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <main
      className={flex({
        direction: 'column',
        minH: '100vh',
        bg: 'gray.50',
      })}
    >
      <AdminTopNavigation />
      {children}
    </main>
  );
};

AdminLayout.displayName = 'AdminLayout';

export default AdminLayout;

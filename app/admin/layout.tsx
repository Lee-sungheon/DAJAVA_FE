import AdminTopNavgation from '@dajava/components/layouts/AdminTopNavgation';
import { flex } from '@dajava/styled-system/patterns';

interface MainLayoutProps {
  children: React.ReactNode;
}

const ApplicationLayout = ({ children }: MainLayoutProps) => {
  return (
    <main className={flex({ direction: 'column' })}>
      <AdminTopNavgation />
      {children}
    </main>
  );
};

ApplicationLayout.displayName = 'ApplicationLayout';

export default ApplicationLayout;

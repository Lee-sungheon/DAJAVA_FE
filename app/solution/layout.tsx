import TopNavigation from '@dajava/components/layouts/TopNavgation';
import { flex } from '@dajava/styled-system/patterns';

interface MainLayoutProps {
  children: React.ReactNode;
}

const ApplicationLayout = ({ children }: MainLayoutProps) => {
  return (
    <main className={flex({ direction: 'column' })}>
      <TopNavigation />
      {children}
    </main>
  );
};

ApplicationLayout.displayName = 'ApplicationLayout';

export default ApplicationLayout;

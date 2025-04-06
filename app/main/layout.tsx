import DajavaSdkLayer from '@dajava/components/layers/DajavaSdkLayer';
import TopNavigation from '@dajava/components/layouts/TopNavgation';
import { flex } from '@dajava/styled-system/patterns';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <main className={flex({ direction: 'column' })}>
      <DajavaSdkLayer />
      <TopNavigation />
      {children}
    </main>
  );
}

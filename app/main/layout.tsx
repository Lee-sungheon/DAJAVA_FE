import TopNavigation from '@dajava/components/layouts/TopNavgation';
import { Flex } from '@dajava/styled-system/jsx';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <Flex direction={'column'}>
      <TopNavigation />
      {children}
    </Flex>
  );
}

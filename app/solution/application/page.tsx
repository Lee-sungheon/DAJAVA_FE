import SolutionApplicationTemplate from '@dajava/domains/solution/templates/SolutionApplicationTemplate';
import { VStack } from '@dajava/styled-system/jsx';

const ApplicationPage = () => {
  return (
    <VStack css={{ alignItems: 'center', py: '90px' }}>
      <SolutionApplicationTemplate />
    </VStack>
  );
};

ApplicationPage.displayName = 'ApplicationPage';

export default ApplicationPage;

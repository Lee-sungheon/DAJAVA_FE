import MainTemplate from '@dajava/domains/introduction/templates/MainTemplate';
import { VStack } from '@dajava/styled-system/jsx';

const MainPage = () => {
  return (
    <VStack css={{ rowGap: '0px' }}>
      <MainTemplate />
    </VStack>
  );
};

MainPage.displayName = 'MainPage';

export default MainPage;

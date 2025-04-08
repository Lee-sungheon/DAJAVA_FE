import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { ROUTES } from '@dajava/constants/routes';
import { COOKIE_KEY } from '@dajava/constants/storeKey';
import SolutionResultAuthTemplate from '@dajava/domains/solution/templates/SolutionResultAuthTemplate';
import { VStack } from '@dajava/styled-system/jsx';

const ResultPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_KEY.SOLUTION_AUTH_TOKEN);
  const uuid = cookieStore.get(COOKIE_KEY.SOLUTION_UUID);

  if (!!token && !!uuid) {
    redirect(ROUTES.SOLUTION_RESULT);
  }

  return (
    <VStack css={{ minHeight: 'calc(100vh - 100px)', alignItems: 'center', justifyContent: 'center', p: '40px' }}>
      <SolutionResultAuthTemplate />
    </VStack>
  );
};

ResultPage.displayName = 'ResultPage';

export default ResultPage;

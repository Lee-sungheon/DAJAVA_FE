import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { ROUTES } from '@dajava/constants/routes';
import { COOKIE_KEY } from '@dajava/constants/storeKey';
import { VStack } from '@dajava/styled-system/jsx';

const ResultPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_KEY.ADMIN_AUTH_TOKEN);

  if (!token) {
    redirect(ROUTES.ADMIN_AUTH);
  }

  return <VStack css={{ minHeight: 'calc(100vh - 100px)', alignItems: 'center', p: '40px' }}></VStack>;
};

ResultPage.displayName = 'ResultPage';

export default ResultPage;

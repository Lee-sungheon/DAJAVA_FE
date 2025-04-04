import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { ROUTES } from '@dajava/constants/routes';
import { COOKIE_KEY } from '@dajava/constants/storeKey';
import AdminAuthTemplate from '@dajava/domains/admin/templates/AdminAuthTemplate';
import { VStack } from '@dajava/styled-system/jsx';

const AdminAuthPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_KEY.ADMIN_AUTH_TOKEN);

  if (!!token) {
    redirect(ROUTES.ADMIN);
  }

  return (
    <VStack css={{ minHeight: 'calc(100vh - 100px)', alignItems: 'center', justifyContent: 'center', p: '40px' }}>
      <AdminAuthTemplate />
    </VStack>
  );
};

AdminAuthPage.displayName = 'AdminAuthPage';

export default AdminAuthPage;

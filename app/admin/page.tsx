import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { ROUTES } from '@dajava/constants/routes';
import { COOKIE_KEY } from '@dajava/constants/storeKey';
import AdminManagementTemplate from '@dajava/domains/admin/templates/AdminManagementTemplate';
import { VStack } from '@dajava/styled-system/jsx';

const AdminPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_KEY.ADMIN_AUTH_TOKEN);

  if (!token) {
    redirect(ROUTES.ADMIN_AUTH);
  }

  return (
    <VStack css={{ py: '16', px: '12', gap: '4' }}>
      <AdminManagementTemplate />
    </VStack>
  );
};

AdminPage.displayName = 'AdminPage';

export default AdminPage;

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { SubmitErrorHandler, SubmitHandler, useFormContext } from 'react-hook-form';

import Button from '@dajava/components/ui/Button';
import { ROUTES } from '@dajava/constants/routes';
import { COOKIE_KEY } from '@dajava/constants/storeKey';
import { VStack } from '@dajava/styled-system/jsx';

import { IAdminAuthForm } from '../../types/auth';

export default function AuthController() {
  const router = useRouter();
  const { handleSubmit } = useFormContext<IAdminAuthForm>();

  const onSubmitAdminAuth: SubmitHandler<IAdminAuthForm> = (data) => {
    console.log(data);
    Cookies.set(COOKIE_KEY.ADMIN_AUTH_TOKEN, 'dummy-auth-token');
    router.replace(ROUTES.ADMIN);
  };

  const onErrorAdminAuth: SubmitErrorHandler<IAdminAuthForm> = (errors) => {
    console.log(errors);
  };

  return (
    <VStack css={{ width: '100%', gap: '24px' }}>
      <Button
        variant={'orange'}
        size={'lg'}
        css={{ width: '100%', py: '14px' }}
        type={'button'}
        onClick={handleSubmit(onSubmitAdminAuth, onErrorAdminAuth)}
      >
        {'확인'}
      </Button>
    </VStack>
  );
}

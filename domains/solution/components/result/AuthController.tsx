import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { SubmitErrorHandler, SubmitHandler, useFormContext } from 'react-hook-form';

import Button from '@dajava/components/ui/Button';
import { ROUTES } from '@dajava/constants/routes';
import { COOKIE_KEY } from '@dajava/constants/storeKey';
import { VStack } from '@dajava/styled-system/jsx';
import { encrypt } from '@dajava/utils/crypto';

import { IResultAuthForm } from '../../types/application';

export default function AuthController() {
  const router = useRouter();
  const { handleSubmit } = useFormContext<IResultAuthForm>();

  const onSubmitSolutionApplication: SubmitHandler<IResultAuthForm> = (data) => {
    const encryptedPassword = encrypt(data.password);

    Cookies.set(COOKIE_KEY.SOLUTION_UUID, data.uuid, {
      secure: true,
      sameSite: 'strict',
    });

    Cookies.set(COOKIE_KEY.SOLUTION_AUTH_TOKEN, encryptedPassword, {
      secure: true,
      sameSite: 'strict',
    });

    router.replace(ROUTES.SOLUTION_RESULT);
  };

  const onErrorSolutionApplication: SubmitErrorHandler<IResultAuthForm> = (errors) => {
    console.log(errors);
  };

  return (
    <VStack css={{ width: '100%', gap: '24px' }}>
      <Button
        variant={'orange'}
        size={'lg'}
        css={{ width: '100%', py: '14px' }}
        type={'button'}
        onClick={handleSubmit(onSubmitSolutionApplication, onErrorSolutionApplication)}
      >
        {'확인'}
      </Button>
    </VStack>
  );
}

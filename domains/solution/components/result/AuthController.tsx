import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { SubmitErrorHandler, SubmitHandler, useFormContext } from 'react-hook-form';

import Button from '@dajava/components/ui/Button';
import { ROUTES } from '@dajava/constants/routes';
import { COOKIE_KEY } from '@dajava/constants/storeKey';
import { useAlert } from '@dajava/hooks/useAlert';
import { VStack } from '@dajava/styled-system/jsx';
import { encrypt } from '@dajava/utils/crypto';

import { useCheckRegisterResult } from '../../apis/application/checkRegisterResult';
import { IResultAuthForm } from '../../types/application';

export default function AuthController() {
  const router = useRouter();
  const { alert } = useAlert();
  const { mutate: checkRegisterResult } = useCheckRegisterResult();
  const { handleSubmit, setValue } = useFormContext<IResultAuthForm>();

  const onSubmitSolutionApplication: SubmitHandler<IResultAuthForm> = (data) => {
    checkRegisterResult(
      {
        serialNumber: data.uuid,
        password: data.password,
      },
      {
        onSuccess: (response) => {
          if (response.isExist) {
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
          } else {
            alert({
              title: '솔루션 정보 확인에 실패했습니다',
              content: '시리얼 넘버 또는 비밀번호가 일치하지 않습니다',
              status: 'error',
            });

            setValue('uuid', '');
            setValue('password', '');
          }
        },
      },
    );
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

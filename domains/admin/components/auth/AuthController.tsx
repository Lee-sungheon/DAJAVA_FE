import { useRouter } from 'next/navigation';
import { SubmitHandler, useFormContext } from 'react-hook-form';

import Button from '@dajava/components/ui/Button';
import { ROUTES } from '@dajava/constants/routes';
import { VStack } from '@dajava/styled-system/jsx';

import { useSubmitAdminAuth } from '../../apis/admin/registerAdminAuth';
import { IAdminAuthForm } from '../../types/auth';

export default function AuthController() {
  const router = useRouter();
  const { handleSubmit } = useFormContext<IAdminAuthForm>();

  const { mutate, isPending } = useSubmitAdminAuth();

  const onSubmitAdminAuth: SubmitHandler<IAdminAuthForm> = (data) => {
    mutate(data, {
      onSuccess: () => router.replace(ROUTES.ADMIN),
    });
  };

  return (
    <VStack css={{ width: '100%', gap: '24px' }}>
      <Button
        variant={'orange'}
        size={'lg'}
        css={{ width: '100%', py: '14px' }}
        type={'button'}
        isLoading={isPending}
        onClick={handleSubmit(onSubmitAdminAuth)}
      >
        {'확인'}
      </Button>
    </VStack>
  );
}

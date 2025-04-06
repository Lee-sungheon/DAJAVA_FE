import Link from 'next/link';
import { SubmitErrorHandler, SubmitHandler, useFormContext } from 'react-hook-form';

import Button from '@dajava/components/ui/Button';
import { ROUTES } from '@dajava/constants/routes';
import { css } from '@dajava/styled-system/css';
import { VStack } from '@dajava/styled-system/jsx';

import { useSubmitApplication } from '../../apis/application/registerApplicationForm';
import { IApplicationForm } from '../../types/application';

export default function ApplicationController() {
  const { handleSubmit } = useFormContext<IApplicationForm>();

  const { mutate, isPending } = useSubmitApplication();

  const onSubmitSolutionApplication: SubmitHandler<IApplicationForm> = (data) => {
    mutate(data);
  };

  const onErrorSolutionApplication: SubmitErrorHandler<IApplicationForm> = (errors) => {
    console.log(errors);
  };

  return (
    <VStack css={{ width: '100%', gap: '24px' }}>
      <Button
        variant={'primary'}
        size={'lg'}
        css={{ width: '100%', py: '14px' }}
        type={'button'}
        onClick={handleSubmit(onSubmitSolutionApplication, onErrorSolutionApplication)}
        disabled={isPending}
        isLoading={isPending}
      >
        {'솔루션 서비스 신청'}
      </Button>

      <Link href={ROUTES.SOLUTION_RESULT}>
        <Button variant={'link'} type={'button'}>
          {'솔루션 결과를 확인하시나요? '}
          <span className={css({ ml: '6px', textDecoration: 'underline' })}>{'redirect'}</span>
        </Button>
      </Link>
    </VStack>
  );
}

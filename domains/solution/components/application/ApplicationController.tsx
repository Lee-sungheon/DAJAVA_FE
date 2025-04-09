import Link from 'next/link';
import { SubmitHandler, useFormContext } from 'react-hook-form';

import Button from '@dajava/components/ui/Button';
import { ROUTES } from '@dajava/constants/routes';
import { css } from '@dajava/styled-system/css';
import { VStack } from '@dajava/styled-system/jsx';

import { useSubmitApplication } from '../../apis/application/registerApplicationForm';
import { APPLICATION_FORM_INITIAL_VALUES } from '../../constants/application';
import { IApplicationForm } from '../../types/application';

export default function ApplicationController() {
  const { handleSubmit, reset } = useFormContext<IApplicationForm>();

  const { mutate, isPending } = useSubmitApplication();

  const onSubmitSolutionApplication: SubmitHandler<IApplicationForm> = (data) => {
    mutate(data, {
      onSuccess: () => reset(APPLICATION_FORM_INITIAL_VALUES),
    });
  };

  return (
    <VStack css={{ width: '100%', gap: '24px' }}>
      <Button
        variant={'primary'}
        size={'lg'}
        css={{ width: '100%', py: '14px' }}
        type={'button'}
        onClick={handleSubmit(onSubmitSolutionApplication)}
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

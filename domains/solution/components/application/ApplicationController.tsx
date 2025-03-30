import { SubmitErrorHandler, SubmitHandler, useFormContext } from 'react-hook-form';

import Button from '@dajava/components/ui/Button';
import { css } from '@dajava/styled-system/css';
import { VStack } from '@dajava/styled-system/jsx';

import { IApplicationForm } from '../../types/application';

export default function ApplicationController() {
  const { handleSubmit } = useFormContext<IApplicationForm>();

  const onSubmitSolutionApplication: SubmitHandler<IApplicationForm> = (data) => {
    console.log(data);
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
      >
        {'솔루션 서비스 신청'}
      </Button>

      <Button variant={'link'} type={'button'}>
        {'솔루션 결과를 확인하시나요? '}
        <span className={css({ ml: '6px', textDecoration: 'underline' })}>{'redirect'}</span>
      </Button>
    </VStack>
  );
}

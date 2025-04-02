'use client';

import { FormProvider, useForm } from 'react-hook-form';

import { vstack } from '@dajava/styled-system/patterns';

import { IApplicationForm } from '../types/application';

const SolutionResultTemplate = () => {
  const methods = useForm<IApplicationForm>({
    defaultValues: {
      email: '',
      password: '',
      url: '',
      startDate: '',
      endDate: '',
    },
  });

  return (
    <FormProvider {...methods}>
      <form className={vstack({ width: '100%', maxWidth: '600px', px: '32px', gap: '84px' })}></form>
    </FormProvider>
  );
};

SolutionResultTemplate.displayName = 'SolutionResultTemplate';

export default SolutionResultTemplate;

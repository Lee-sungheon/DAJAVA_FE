'use client';

import { FormProvider, useForm } from 'react-hook-form';

import { vstack } from '@dajava/styled-system/patterns';

import ApplicationController from '../components/application/ApplicationController';
import ApplicationForm from '../components/application/ApplicationForm';
import { APPLICATION_FORM_INITIAL_VALUES } from '../constants/application';
import { IApplicationForm } from '../types/application';

const SolutionApplicationTemplate = () => {
  const methods = useForm<IApplicationForm>({
    defaultValues: APPLICATION_FORM_INITIAL_VALUES,
  });

  return (
    <FormProvider {...methods}>
      <form className={vstack({ width: '100%', maxWidth: '600px', px: '32px', gap: '84px' })}>
        <ApplicationForm />
        <ApplicationController />
      </form>
    </FormProvider>
  );
};

SolutionApplicationTemplate.displayName = 'SolutionApplicationTemplate';

export default SolutionApplicationTemplate;

'use client';

import { FormProvider, useForm } from 'react-hook-form';

import { css } from '@dajava/styled-system/css';
import { VStack } from '@dajava/styled-system/jsx';

import AuthController from '../components/result/AuthController';
import AuthForm from '../components/result/AuthForm';
import AuthHeader from '../components/result/AuthHeader';
import { IResultAuthForm } from '../types/application';

const SolutionResultAuthTemplate = () => {
  const methods = useForm<IResultAuthForm>({
    defaultValues: {
      uuid: '',
      password: '',
    },
  });

  return (
    <VStack
      css={{
        width: '100%',
        maxWidth: '1000px',
        backgroundColor: '#F5F5F6',
        pt: '55px',
        pb: '85px',
        borderRadius: '40px',
        boxShadow: '0px 4px 4px 0px #00000040',
      }}
    >
      <AuthHeader />
      <FormProvider {...methods}>
        <form className={css({ width: '100%', px: '30%' })}>
          <AuthForm />
          <AuthController />
        </form>
      </FormProvider>
    </VStack>
  );
};

SolutionResultAuthTemplate.displayName = 'SolutionResultAuthTemplate';

export default SolutionResultAuthTemplate;

'use client';

import { FormProvider, useForm } from 'react-hook-form';

import { css } from '@dajava/styled-system/css';
import { VStack } from '@dajava/styled-system/jsx';

import AuthController from '../components/auth/AuthController';
import AuthForm from '../components/auth/AuthForm';
import AuthHeader from '../components/auth/AuthHeader';
import { IAdminAuthForm } from '../types/auth';

const AdminAuthTemplate = () => {
  const methods = useForm<IAdminAuthForm>({
    defaultValues: {
      adminCode: '',
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
        rowGap: 0,
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

AdminAuthTemplate.displayName = 'AdminAuthTemplate';

export default AdminAuthTemplate;

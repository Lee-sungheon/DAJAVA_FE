import { useFormContext } from 'react-hook-form';

import Input from '@dajava/components/ui/Input';
import { css } from '@dajava/styled-system/css';
import { VStack } from '@dajava/styled-system/jsx';

import { IAdminAuthForm } from '../../types';

const AuthForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<IAdminAuthForm>();

  return (
    <VStack css={{ width: '100%', py: '5vh', gap: '16px' }}>
      <Input
        type={'password'}
        placeholder={'Admin Code'}
        error={String(errors['adminCode']?.message ?? '')}
        className={inputClassName}
        {...register('adminCode', {
          required: '관리자 코드를 입력해주세요.',
        })}
      />
    </VStack>
  );
};

const inputClassName = css({
  backgroundColor: 'white',
  borderWidth: '2px',

  _focus: {
    borderColor: 'orange.500',
    borderWidth: '2px',
    boxShadow: '0px 4px 4px 0px #00000040',
  },
});

AuthForm.displayName = 'AuthForm';

export default AuthForm;

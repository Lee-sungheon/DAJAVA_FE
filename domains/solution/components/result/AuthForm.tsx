import { useFormContext } from 'react-hook-form';

import Input from '@dajava/components/ui/Input';
import { css } from '@dajava/styled-system/css';
import { VStack } from '@dajava/styled-system/jsx';

import { IResultAuthForm } from '../../types/application';

const AuthForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<IResultAuthForm>();

  return (
    <VStack css={{ width: '100%', py: '60px', gap: '16px' }}>
      <Input
        placeholder={'UUID'}
        className={inputClassName}
        error={String(errors['uuid']?.message ?? '')}
        {...register('uuid', {
          required: '일련번호를 입력해주세요.',
        })}
      />
      <Input
        type={'password'}
        placeholder={'Password'}
        error={String(errors['password']?.message ?? '')}
        className={inputClassName}
        {...register('password', {
          required: '비밀번호를 입력해주세요.',
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

'use client';

import { useFormContext } from 'react-hook-form';

import Input from '@dajava/components/ui/Input';
import { EMAIL_REGEX } from '@dajava/constants/regex';

import { IApplicationForm } from '../../types/application';

const EmailInput = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<IApplicationForm>();

  return (
    <Input
      type={'email'}
      placeholder={'이메일'}
      error={String(errors['email']?.message ?? '')}
      {...register('email', {
        required: '이메일을 입력해주세요.',
        pattern: {
          value: EMAIL_REGEX,
          message: '올바른 이메일 형식이 아닙니다.',
        },
      })}
    />
  );
};

EmailInput.displayName = 'EmailInput';

export default EmailInput;

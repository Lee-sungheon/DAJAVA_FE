'use client';

import { useFormContext } from 'react-hook-form';

import Input from '@dajava/components/ui/Input';
import { URL_REGEX } from '@dajava/constants/regex';

import { IApplicationForm } from '../../types/application';

const URLInput = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<IApplicationForm>();

  return (
    <Input
      type={'url'}
      placeholder={'서비스 제공 URL'}
      error={String(errors['url']?.message ?? '')}
      {...register('url', {
        required: '서비스 제공 URL을 입력해주세요.',
        pattern: {
          value: URL_REGEX,
          message: '올바른 URL 형식이 아닙니다.',
        },
      })}
    />
  );
};

URLInput.displayName = 'URLInput';

export default URLInput;

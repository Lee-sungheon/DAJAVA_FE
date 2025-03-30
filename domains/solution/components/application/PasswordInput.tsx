'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { EyeIcon, EyeOffIcon } from '@dajava/components/ui/icons';
import Input from '@dajava/components/ui/Input';
import { css } from '@dajava/styled-system/css';
import { styled } from '@dajava/styled-system/jsx';

import { IApplicationForm } from '../../types/application';

const PASSWORD_MIN_LENGTH = 8;

const PasswordInput = () => {
  const [isVisible, setIsVisible] = useState(false);
  const {
    register,
    formState: { errors },
  } = useFormContext<IApplicationForm>();

  return (
    <div className={css({ width: '100%' })}>
      <div className={css({ position: 'relative' })}>
        <Input
          type={isVisible ? 'text' : 'password'}
          placeholder={'임시 비밀번호'}
          error={String(errors['password']?.message ?? '')}
          css={{
            paddingRight: '48px',
          }}
          {...register('password', {
            required: '비밀번호를 입력해주세요.',
            minLength: {
              value: PASSWORD_MIN_LENGTH,
              message: `비밀번호는 최소 ${PASSWORD_MIN_LENGTH}자 이상이어야 합니다.`,
            },
          })}
        />
        <VisibilityToggleButton type={'button'} onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? <EyeOffIcon /> : <EyeIcon />}
        </VisibilityToggleButton>
      </div>
    </div>
  );
};

const VisibilityToggleButton = styled('button', {
  base: {
    position: 'absolute',
    right: '16px',
    top: '8px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'gray.500',
    _hover: {
      color: 'gray.700',
    },
    _focus: {
      outline: 'none',
    },
  },
});

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;

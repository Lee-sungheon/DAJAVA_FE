'use client';

import { forwardRef } from 'react';

import { css } from '@dajava/styled-system/css';
import { Box, styled } from '@dajava/styled-system/jsx';
import { SystemStyleObject } from '@dajava/styled-system/types';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  css?: SystemStyleObject;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ error, css: cssProp, ...props }, ref) => {
  return (
    <Box css={{ width: '100%' }}>
      <StyledInput
        ref={ref}
        css={{
          borderColor: error ? 'red.500' : 'token(colors.gray.200)',
          _focus: {
            borderColor: error ? 'red.500' : 'gray.900',
            boxShadow: error ? '0 0 0 3px rgba(239, 68, 68, 0.1)' : '0 0 0 3px rgba(59, 130, 246, 0.1)',
          },
          ...cssProp,
        }}
        {...props}
      />
      {error && (
        <p
          className={css({
            color: 'red.500',
            fontSize: '14px',
            mt: '4px',
            ml: '16px',
          })}
        >
          {error}
        </p>
      )}
    </Box>
  );
});

const StyledInput = styled('input', {
  base: {
    width: '100%',
    maxWidth: '600px',
    display: 'block',
    h: '48px',
    px: '16px',
    py: '12px',
    border: '1px solid',
    borderRadius: '8px',
    fontSize: '16px',
    lineHeight: '24px',
    outline: 'none',
    transition: 'all 0.2s ease-in-out',
    _placeholder: {
      color: 'gray.400',
    },
    _focus: {
      borderColor: 'gray.900',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
    },
  },
});

Input.displayName = 'Input';

export default Input;

import { styled } from '@dajava/styled-system/jsx';

import type { SystemStyleObject } from '@dajava/styled-system/types';

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof SystemStyleObject>,
    SystemStyleObject {
  variant?: 'primary' | 'secondary' | 'orange' | 'outline' | 'link';
  size?: 'sm' | 'md' | 'lg';
  css?: SystemStyleObject;
  isLoading?: boolean;
}

export default function Button({ children, variant, size, css, isLoading, disabled, ...props }: ButtonProps) {
  return (
    <StyledButton variant={variant} size={size} css={css} disabled={disabled ?? isLoading} {...props}>
      {isLoading ? (
        <LoadingSpinner>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} />
          ))}
        </LoadingSpinner>
      ) : (
        children
      )}
    </StyledButton>
  );
}

const StyledButton = styled('button', {
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'md',
    fontWeight: 'medium',
    transition: 'all 0.2s',
    cursor: 'pointer',
    position: 'relative',

    _disabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
    _focus: {
      outline: 'none',
      ring: '2px',
      ringOffset: '2px',
    },
  },
  variants: {
    variant: {
      primary: {
        bg: 'gray.700',
        color: 'white',
        _hover: { bg: 'gray.800' },
      },
      secondary: {
        bg: 'gray.200',
        color: 'gray.900',
        _hover: { bg: 'gray.300' },
      },
      orange: {
        bg: 'orange.500',
        color: 'white',
        _hover: { bg: 'orange.600' },
      },
      outline: {
        border: '1px solid',
        borderColor: 'gray.300',
        bg: 'transparent',
        _hover: { bg: 'gray.100' },
      },
      link: {
        bg: 'transparent',
        color: 'gray.900',
        _hover: { bg: 'gray.100' },
      },
    },
    size: {
      sm: {
        px: '3',
        py: '1.5',
        fontSize: 'sm',
        minHeight: '32px',
      },
      md: {
        px: '4',
        py: '2',
        fontSize: 'md',
        minHeight: '40px',
      },
      lg: {
        px: '6',
        py: '3',
        fontSize: 'lg',
        minHeight: '48px',
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

const LoadingSpinner = styled('div', {
  base: {
    display: 'inline-block',
    position: 'relative',
    width: '20px',
    height: '20px',

    '& div': {
      boxSizing: 'border-box',
      display: 'block',
      position: 'absolute',
      width: '16px',
      height: '16px',
      margin: '2px',
      border: '2px solid currentColor',
      borderRadius: '50%',
      animation: 'spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite',
      borderColor: 'currentColor transparent transparent transparent',
    },

    '& div:nth-child(1)': {
      animationDelay: '-0.45s',
    },

    '& div:nth-child(2)': {
      animationDelay: '-0.3s',
    },

    '& div:nth-child(3)': {
      animationDelay: '-0.15s',
    },
  },
});

import { styled } from '@dajava/styled-system/jsx';

import type { SystemStyleObject } from '@dajava/styled-system/types';

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof SystemStyleObject>,
    SystemStyleObject {
  variant?: 'primary' | 'secondary' | 'orange' | 'outline' | 'link';
  size?: 'sm' | 'md' | 'lg';
  css?: SystemStyleObject;
}

export default function Button({ children, variant, size, css, ...props }: ButtonProps) {
  return (
    <StyledButton variant={variant} size={size} css={css} {...props}>
      {children}
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
      },
      md: {
        px: '4',
        py: '2',
        fontSize: 'md',
      },
      lg: {
        px: '6',
        py: '3',
        fontSize: 'lg',
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

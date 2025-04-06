'use client';

import { useAtom } from 'jotai';

import { alertAtom } from '@dajava/stores/alert';
import { styled } from '@dajava/styled-system/jsx';

export const Alert = () => {
  const [alertState, setAlert] = useAtom(alertAtom);
  const { isOpen, status = 'success', title, content, onConfirm, onCancel } = alertState;

  const handleConfirm = () => {
    onConfirm?.();
    setAlert({ isOpen: false });
  };

  const handleCancel = () => {
    onCancel?.();
    setAlert({ isOpen: false });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ModalOverlay>
      <ModalContainer>
        <StyledAlert status={status}>
          <AlertContent>
            {title && <AlertTitle>{title}</AlertTitle>}
            {content && <AlertMessage>{content}</AlertMessage>}
          </AlertContent>
          <ButtonGroup>
            {onCancel && (
              <CancelButton
                type={'button'}
                onClick={() => {
                  handleCancel();
                  setAlert({ isOpen: false });
                }}
              >
                {'취소'}
              </CancelButton>
            )}
            <ConfirmButton
              type={'button'}
              status={status}
              onClick={() => {
                handleConfirm();
                setAlert({ isOpen: false });
              }}
            >
              {'확인'}
            </ConfirmButton>
          </ButtonGroup>
        </StyledAlert>
      </ModalContainer>
    </ModalOverlay>
  );
};

const ModalOverlay = styled('div', {
  base: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
});

const ModalContainer = styled('div', {
  base: {
    width: '100%',
    maxWidth: '400px',
    px: '16px',
  },
});

const StyledAlert = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    p: '32px 24px 24px',
    borderRadius: 'lg',
    backgroundColor: 'white',
    boxShadow: 'lg',
  },
  variants: {
    status: {
      success: {
        border: '1px solid',
        borderColor: 'green.200',
      },
      error: {
        border: '1px solid',
        borderColor: 'red.200',
      },
      warning: {
        border: '1px solid',
        borderColor: 'yellow.200',
      },
      info: {
        border: '1px solid',
        borderColor: 'blue.200',
      },
    },
  },
  defaultVariants: {
    status: 'info',
  },
});

const AlertContent = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '12px',
    textAlign: 'center',
  },
});

const AlertTitle = styled('div', {
  base: {
    fontSize: 'lg',
    fontWeight: 'semibold',
  },
});

const AlertMessage = styled('div', {
  base: {
    fontSize: 'md',
    color: 'gray.600',
    lineHeight: '1.5',
    whiteSpace: 'pre-wrap',
    wordBreak: 'keep-all',
  },
});

const ButtonGroup = styled('div', {
  base: {
    display: 'flex',
    gap: '8px',
  },
});

const Button = styled('button', {
  base: {
    flex: 1,
    padding: '12px 16px',
    borderRadius: 'md',
    fontSize: 'md',
    fontWeight: 'medium',
    cursor: 'pointer',
  },
});

const CancelButton = styled(Button, {
  base: {
    backgroundColor: 'gray.100',
    color: 'gray.700',
    _hover: {
      backgroundColor: 'gray.200',
    },
  },
});

const ConfirmButton = styled(Button, {
  base: {
    color: 'white',
  },
  variants: {
    status: {
      success: {
        backgroundColor: 'orange.500',
        _hover: {
          backgroundColor: 'orange.600',
        },
      },
      error: {
        backgroundColor: 'red.600',
        _hover: {
          backgroundColor: 'red.700',
        },
      },
      warning: {
        backgroundColor: 'yellow.600',
        _hover: {
          backgroundColor: 'yellow.700',
        },
      },
      info: {
        backgroundColor: 'blue.600',
        _hover: {
          backgroundColor: 'blue.700',
        },
      },
    },
  },
});

Alert.displayName = 'Alert';

export default Alert;

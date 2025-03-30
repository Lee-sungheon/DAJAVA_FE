'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ROUTES } from '@dajava/constants/routes';
import { Flex, HStack } from '@dajava/styled-system/jsx';
import { flex } from '@dajava/styled-system/patterns';

import Button from '../ui/Button';

declare global {
  interface Window {
    dajava: {
      UserEventRecorder: new () => {
        startRecording: () => void;
        stopRecording: () => void;
      };
    };
  }
}

export default function TopNavigation() {
  const pathname = usePathname();

  return (
    <nav
      className={flex({
        justifyContent: 'space-between',
        gap: '24px',
        p: '22px 32px',
        borderBottom: '1px solid token(colors.gray.300)',
      })}
    >
      <HStack gap={'12px'} flex={1} justifyContent={'space-between'}>
        <Link href={ROUTES.MAIN} replace>
          <img src={'/dajavaLogo.svg'} alt={'Dajava Logo'} />
        </Link>
        <HStack>
          <Link href={ROUTES.MAIN} replace>
            <Button
              variant={'link'}
              size={'lg'}
              css={{ px: '1.5', fontWeight: pathname === ROUTES.MAIN ? '700' : '400' }}
            >
              {'서비스 소개'}
            </Button>
          </Link>
          <Link href={ROUTES.MAIN} replace>
            <Button variant={'link'} size={'lg'} css={{ px: '1.5' }}>
              {'서비스 정책'}
            </Button>
          </Link>
          <Link href={ROUTES.DOCS} replace>
            <Button
              variant={'link'}
              size={'lg'}
              css={{ px: '1.5', fontWeight: pathname === ROUTES.DOCS ? '700' : '400' }}
            >
              {'개발자 문서'}
            </Button>
          </Link>
        </HStack>
      </HStack>

      <HStack gap={'12px'}>
        <Link href={ROUTES.SOLUTION_RESULT}>
          <Button
            variant={'secondary'}
            size={'lg'}
            css={{ fontWeight: pathname === ROUTES.SOLUTION_RESULT ? '700' : '400' }}
          >
            {'솔루션 결과'}
          </Button>
        </Link>
        <Link href={ROUTES.SOLUTION_APPLICATION}>
          <Button size={'lg'} css={{ fontWeight: pathname === ROUTES.SOLUTION_APPLICATION ? '700' : '400' }}>
            {'솔루션 신청'}
          </Button>
        </Link>
      </HStack>
    </nav>
  );
}

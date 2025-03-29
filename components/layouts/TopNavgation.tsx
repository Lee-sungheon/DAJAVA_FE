'use client';

import Link from 'next/link';

import { ROUTES } from '@dajava/constants/routes';
import { Flex, HStack } from '@dajava/styled-system/jsx';

import DajavaLogoIcon from '../icons/DajavaLogoIcon';
import Button from '../ui/Button';

export default function TopNavigation() {
  return (
    <Flex
      justifyContent={'space-between'}
      gap={'24px'}
      css={{ p: '22px 32px', borderBottom: '1px solid token(colors.gray.300)' }}
    >
      <HStack gap={'12px'} flex={1} justifyContent={'space-between'}>
        <Link href={ROUTES.MAIN} replace>
          <DajavaLogoIcon />
        </Link>
        <HStack>
          <Link href={ROUTES.MAIN} replace>
            <Button variant={'link'} size={'lg'} css={{ px: '1.5' }}>
              {'서비스 소개'}
            </Button>
          </Link>

          <Link href={ROUTES.DOCS} replace>
            <Button variant={'link'} size={'lg'} css={{ px: '1.5' }}>
              {'개발자 문서'}
            </Button>
          </Link>
        </HStack>
      </HStack>

      <HStack gap={'12px'}>
        <Link href={ROUTES.SOLUTION_RESULT}>
          <Button variant={'secondary'} size={'lg'}>
            {'솔루션 결과'}
          </Button>
        </Link>
        <Link href={ROUTES.SOLUTION_APPLY}>
          <Button size={'lg'}>{'솔루션 신청'}</Button>
        </Link>
      </HStack>
    </Flex>
  );
}

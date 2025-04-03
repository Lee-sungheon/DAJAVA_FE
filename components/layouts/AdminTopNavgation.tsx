'use client';

import Link from 'next/link';

import { ROUTES } from '@dajava/constants/routes';
import { HStack } from '@dajava/styled-system/jsx';
import { flex } from '@dajava/styled-system/patterns';

const AdminTopNavgation = () => {
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
        <Link href={ROUTES.ADMIN} replace>
          <img src={'/dajavaLogo.svg'} alt={'Dajava Logo'} />
        </Link>
      </HStack>
    </nav>
  );
};

AdminTopNavgation.displayName = 'AdminTopNavgation';

export default AdminTopNavgation;

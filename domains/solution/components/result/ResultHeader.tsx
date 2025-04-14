'use client';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

import Button from '@dajava/components/ui/Button';
import { ROUTES } from '@dajava/constants/routes';
import { COOKIE_KEY } from '@dajava/constants/storeKey';
import { css } from '@dajava/styled-system/css';
import { HStack } from '@dajava/styled-system/jsx';

export const ResultHeader = () => {
  const router = useRouter();

  return (
    <HStack css={{ width: '100%', justifyContent: 'space-between' }}>
      <h2 className={css({ fontSize: '40px', fontWeight: 800, textShadow: '0px 4px 4px #00000040' })}>
        {'Solution Result'}
      </h2>
      <Button
        variant={'primary'}
        size={'lg'}
        onClick={() => {
          Cookies.remove(COOKIE_KEY.SOLUTION_UUID);
          Cookies.remove(COOKIE_KEY.SOLUTION_AUTH_TOKEN);
          router.replace(ROUTES.SOLUTION_RESULT_AUTH);
        }}
      >
        {'다른 솔루션 찾기'}
      </Button>
    </HStack>
  );
};

ResultHeader.displayName = 'ResultHeader';

export default ResultHeader;

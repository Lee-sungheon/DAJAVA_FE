'use client';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { ROUTES } from '@dajava/constants/routes';
import { COOKIE_KEY } from '@dajava/constants/storeKey';
import { decrypt } from '@dajava/utils/crypto';

export default function ResultController() {
  const router = useRouter();

  useEffect(() => {
    const authToken = Cookies.get(COOKIE_KEY.SOLUTION_AUTH_TOKEN);

    if (!authToken) {
      router.replace(ROUTES.SOLUTION_RESULT_AUTH);
      return;
    }

    const decryptedPassword = decrypt(authToken);
    console.log('복호화된 비밀번호:', decryptedPassword);
  }, [router]);

  return null;
}

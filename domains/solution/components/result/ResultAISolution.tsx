'use client';

import Cookies from 'js-cookie';

import Markdown from '@dajava/components/ui/Markdown';
import { COOKIE_KEY } from '@dajava/constants/storeKey';
import { css } from '@dajava/styled-system/css';
import { VStack } from '@dajava/styled-system/jsx';
import { decrypt } from '@dajava/utils/crypto';

import { useGetSolutionInfo } from '../../apis/application/getSolutionInfo';

import ResultAISolutionError from './ResultAISolutionError';
import ResultAISolutionLoading from './ResultAISolutionLoading';

const ResultAISolution = () => {
  const token = Cookies.get(COOKIE_KEY.SOLUTION_AUTH_TOKEN);
  const decryptedPassword = decrypt(token ?? '');
  const serialNumber = Cookies.get(COOKIE_KEY.SOLUTION_UUID);

  const { data, isLoading, error } = useGetSolutionInfo(serialNumber ?? '', decryptedPassword ?? '');

  if (isLoading) {
    return <ResultAISolutionLoading />;
  }

  if (error) {
    return <ResultAISolutionError />;
  }

  return (
    <VStack
      id={'solution'}
      css={{
        width: '100%',
        p: '24px',
        alignItems: 'flex-start',
        backgroundColor: 'white',
        boxShadow: '1px 2px 4px 2px #00000040',
        rowGap: '16px',
        borderRadius: 'xl',
      }}
    >
      <p className={css({ fontSize: 'xl', fontWeight: 600 })}>{'AI 솔루션'}</p>
      <hr className={css({ width: '100%', border: '1px dashed', borderColor: 'gray.200' })} />

      {data && <Markdown markdownContent={data.text} />}
    </VStack>
  );
};

ResultAISolution.displayName = 'ResultAISolution';

export default ResultAISolution;

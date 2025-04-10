import Link from 'next/link';

import Button from '@dajava/components/ui/Button';
import { ROUTES } from '@dajava/constants/routes';
import { css } from '@dajava/styled-system/css';
import { VStack } from '@dajava/styled-system/jsx';

const MainBanner = () => {
  return (
    <VStack
      css={{
        width: '100%',
        py: '18vh',
        backgroundColor: 'gray.50',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: '24px',
      }}
    >
      <h1
        className={css({
          fontSize: { base: '4xl', md: '6xl' },
          fontWeight: 700,
          lineHeight: 'tight',
        })}
      >
        {'사용자 행동 분석으로\n웹사이트 경험을 혁신하세요'}
      </h1>
      <p
        className={css({
          fontSize: { base: 'lg', md: 'xl' },
          color: 'gray.600',
          lineHeight: '1.5',
          whiteSpace: 'pre-wrap',
          wordBreak: 'keep-all',
        })}
      >
        {
          'DAJAVA와 함께라면 데이터 기반의 UX 개선이 쉬워집니다.\n히트맵부터AI 분석까지, 성장을 위한 인사이트를 발견하세요.'
        }
      </p>
      <Link href={ROUTES.SOLUTION_APPLICATION}>
        <Button variant={'primary'} size={'lg'} css={{ mt: '16px' }}>
          {'솔루션 신청하기'}
        </Button>
      </Link>
    </VStack>
  );
};

MainBanner.displayName = 'MainBanner';

export default MainBanner;

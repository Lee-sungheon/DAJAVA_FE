import { transform } from 'typescript';

import { css } from '@dajava/styled-system/css';
import { Box, Grid, styled, VStack } from '@dajava/styled-system/jsx';

const MainPage = () => {
  return (
    <VStack css={{ rowGap: '0px' }}>
      <VStack
        css={{
          width: '100%',
          py: '15vh',
          backgroundColor: 'gray.100',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p className={css({ fontSize: '6xl', fontWeight: 700 })}>{'Main Page'}</p>
      </VStack>

      <VStack
        css={{
          width: '100%',
          p: '64px',
          backgroundColor: 'white',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          gap: '48px',
        }}
      >
        <VStack css={{ gap: '8px', alignItems: 'flex-start' }}>
          <p className={css({ fontSize: '3xl', fontWeight: 700 })}>{'사용자 행동 패턴 분석 & 솔루션'}</p>
          <p className={css({ fontSize: '2xl', fontWeight: 500, color: 'gray.400' })}>
            {'사이트 이용자의 전반적인 히트맵 & AI의 이상치 데이터 분석 결과 제공'}
          </p>
        </VStack>

        <Grid
          css={{
            width: '100%',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
          }}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <CardBox key={index}>
              <div
                className={css({
                  width: '100%',
                  height: '200px',
                  backgroundColor: 'gray.100',
                })}
              />
              <VStack css={{ p: '24px', gap: '8px' }}>
                <p className={css({ fontSize: 'xl', fontWeight: 600 })}>{'Title'}</p>
                <p className={css({ fontSize: 'sm', color: 'gray.600', lineHeight: '1.5' })}>
                  {
                    "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story."
                  }
                </p>
              </VStack>
            </CardBox>
          ))}
        </Grid>
      </VStack>
    </VStack>
  );
};

const CardBox = styled(Box, {
  base: {
    border: '1px solid',
    borderColor: 'gray.200',
    borderRadius: 'lg',
    overflow: 'hidden',
    transition: 'all 0.2s',
    cursor: 'pointer',
    _hover: {
      transform: 'translateY(-4px)',
      boxShadow: 'md',
    },
  },
});

MainPage.displayName = 'MainPage';

export default MainPage;

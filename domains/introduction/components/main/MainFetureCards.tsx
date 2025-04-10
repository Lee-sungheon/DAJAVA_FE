import { css } from '@dajava/styled-system/css';
import { Box, Grid, styled, VStack } from '@dajava/styled-system/jsx';

import { MAIN_FEATURE_CARDS } from '../../constants/main';

const MainFetureCards = () => {
  return (
    <VStack
      css={{
        width: '100%',
        maxWidth: '1200px',
        p: { base: '32px', md: '64px' },
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '48px',
      }}
    >
      <VStack css={{ gap: '8px', alignItems: 'center', textAlign: 'center' }}>
        <h2 className={css({ fontSize: '3xl', fontWeight: 700 })}>{'DAJAVA 주요 기능'}</h2>
        <p className={css({ fontSize: 'xl', fontWeight: 500, color: 'gray.500' })}>
          {'성장을 위한 모든 데이터 인사이트를 한 곳에서 확인하세요.'}
        </p>
      </VStack>

      <Grid
        css={{
          width: '100%',
          gridTemplateColumns: { base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, // Responsive columns
          gap: '24px',
        }}
      >
        {MAIN_FEATURE_CARDS.map((card, index) => (
          <CardBox key={index}>
            <img
              src={card.imageUrl}
              alt={`${card.title} 기능 이미지`}
              className={css({
                width: '100%',
                objectFit: 'cover',
                backgroundColor: 'gray.100',
              })}
            />
            <VStack css={{ p: '24px', gap: '8px', alignItems: 'flex-start' }}>
              <p className={css({ fontSize: 'xl', fontWeight: 600 })}>{card.title}</p>
              <p className={css({ fontSize: 'sm', color: 'gray.600', lineHeight: '1.5' })}>{card.description}</p>
            </VStack>
          </CardBox>
        ))}
      </Grid>
    </VStack>
  );
};

const CardBox = styled(Box, {
  base: {
    border: '1px solid',
    borderColor: 'gray.200',
    borderRadius: 'lg',
    overflow: 'hidden',
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',
    _hover: {
      transform: 'translateY(-5px)',
      boxShadow: 'lg',
    },
  },
});

MainFetureCards.displayName = 'MainFetureCards';

export default MainFetureCards;

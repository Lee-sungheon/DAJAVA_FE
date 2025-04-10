import Link from 'next/link';

import { ROUTES } from '@dajava/constants/routes';
import { css } from '@dajava/styled-system/css';
import { Box, styled, VStack, HStack } from '@dajava/styled-system/jsx';

const MainFooter = () => {
  return (
    <FooterBox>
      <VStack
        css={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          gap: '48px',
          px: '24px',
        }}
      >
        <VStack css={{ alignItems: 'center', gap: '16px' }}>
          <h2 className={css({ fontSize: '2xl', fontWeight: 700 })}>{'DAJAVA'}</h2>
          <p className={css({ fontSize: 'sm', color: 'gray.600', lineHeight: '1.6', textAlign: 'center' })}>
            {'사용자 행동 분석으로 웹사이트 경험을 혁신하는 AI 솔루션'}
          </p>
          <HStack css={{ gap: '16px' }}>
            <VStack css={{ rowGap: '4px' }}>
              <IconWrapper css={{ backgroundColor: 'white' }}>
                <a
                  href={'https://github.com/prgrms-web-devcourse-final-project/WEB3_4_DAJAVA_BE'}
                  target={'_blank'}
                  rel={'noopener noreferrer'}
                >
                  <img src={'/github-mark.png'} alt={'GitHub'} className={css({ width: '24px', height: '24px' })} />
                </a>
              </IconWrapper>
              <p className={css({ fontSize: 'xs', color: 'gray.600' })}>{'BE'}</p>
            </VStack>
            <VStack css={{ rowGap: '4px' }}>
              <IconWrapper css={{ backgroundColor: 'black' }}>
                <a href={'https://github.com/Lee-sungheon/DAJAVA_FE'} target={'_blank'} rel={'noopener noreferrer'}>
                  <img
                    src={'/github-mark-white.png'}
                    alt={'GitHub'}
                    className={css({ width: '24px', height: '24px' })}
                  />
                </a>
              </IconWrapper>
              <p className={css({ fontSize: 'xs', color: 'gray.600' })}>{'FE'}</p>
            </VStack>
          </HStack>
        </VStack>

        <HStack
          css={{
            width: '100%',
            justifyContent: 'center',
            gap: '48px',
            flexWrap: 'wrap',
          }}
        >
          <VStack css={{ alignItems: 'center', gap: '16px' }}>
            <h3 className={css({ fontSize: 'lg', fontWeight: 600 })}>{'제품'}</h3>
            <VStack css={{ alignItems: 'center', gap: '8px' }}>
              <Link
                href={ROUTES.SOLUTION_APPLICATION}
                className={css({ color: 'gray.600', _hover: { color: 'gray.900' } })}
              >
                {'솔루션 신청'}
              </Link>
              <Link href={ROUTES.DOCS} className={css({ color: 'gray.600', _hover: { color: 'gray.900' } })}>
                {'문서'}
              </Link>
              <Link href={ROUTES.POLICY} className={css({ color: 'gray.600', _hover: { color: 'gray.900' } })}>
                {'정책'}
              </Link>
            </VStack>
          </VStack>

          <VStack css={{ alignItems: 'center', gap: '16px' }}>
            <h3 className={css({ fontSize: 'lg', fontWeight: 600 })}>{'지원'}</h3>
            <VStack css={{ alignItems: 'center', gap: '8px' }}>
              <Link href={'#'} className={css({ color: 'gray.600', _hover: { color: 'gray.900' } })}>
                {'FAQ'}
              </Link>
              <Link href={'#'} className={css({ color: 'gray.600', _hover: { color: 'gray.900' } })}>
                {'문의하기'}
              </Link>
              <Link href={'#'} className={css({ color: 'gray.600', _hover: { color: 'gray.900' } })}>
                {'고객센터'}
              </Link>
            </VStack>
          </VStack>

          <VStack css={{ alignItems: 'center', gap: '16px' }}>
            <h3 className={css({ fontSize: 'lg', fontWeight: 600 })}>{'연락처'}</h3>
            <VStack css={{ alignItems: 'center', gap: '8px' }}>
              <p className={css({ color: 'gray.600' })}>{'이메일: support@dajava.com'}</p>
              <p className={css({ color: 'gray.600' })}>{'전화: 02-1234-5678'}</p>
              <p className={css({ color: 'gray.600' })}>{'주소: 서울특별시 강남구'}</p>
            </VStack>
          </VStack>
        </HStack>

        <Box css={{ width: '100%', borderTop: '1px solid', borderColor: 'gray.200', pt: '24px' }}>
          <p className={css({ fontSize: 'xs', color: 'gray.400', textAlign: 'center' })}>
            {'© 2025 DAJAVA. All rights reserved.'}
          </p>
        </Box>
      </VStack>
    </FooterBox>
  );
};

const FooterBox = styled(Box, {
  base: {
    width: '100%',
    py: '64px',
    backgroundColor: 'gray.100',
    borderTop: '1px solid',
    borderColor: 'gray.200',
  },
});

const IconWrapper = styled(Box, {
  base: {
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    transition: 'all 0.2s ease-in-out',
    _hover: {
      transform: 'scale(1.1)',
    },
  },
});

MainFooter.displayName = 'MainFooter';

export default MainFooter;

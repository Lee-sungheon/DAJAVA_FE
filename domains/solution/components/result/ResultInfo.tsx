import Cookies from 'js-cookie';
import Link from 'next/link';

import { COOKIE_KEY } from '@dajava/constants/storeKey';
import { HStack, styled, VStack } from '@dajava/styled-system/jsx';
import { decrypt } from '@dajava/utils/crypto';

import { useGetSolutionHeatmap } from '../../apis/application/getSolutionHeatmap';

import ResultInfoSkeleton from './ResultInfoSkeleton';

const ResultInfo = () => {
  const serialNumber = Cookies.get(COOKIE_KEY.SOLUTION_UUID);
  const decryptedPassword = decrypt(Cookies.get(COOKIE_KEY.SOLUTION_AUTH_TOKEN) ?? '');

  const { data, isLoading } = useGetSolutionHeatmap(serialNumber ?? '', decryptedPassword ?? '', 'click');

  if (isLoading || !data) {
    return <ResultInfoSkeleton />;
  }

  return (
    <ResultInfoLayout>
      <VStack css={{ flex: 1, gap: '8px' }}>
        <DescriptionText>{'요청 URL'}</DescriptionText>
        <Link href={data?.metadata.pageUrl} target={'_blank'}>
          <InfoText>{data?.metadata.pageUrl}</InfoText>
        </Link>
      </VStack>
      <Divider />
      <VStack css={{ flex: 1, gap: '8px' }}>
        <DescriptionText>{'Total Sessions'}</DescriptionText>
        <InfoText>{data?.metadata.totalSessions}</InfoText>
      </VStack>
      <Divider />
      <VStack css={{ flex: 1, gap: '8px' }}>
        <DescriptionText>{'Serial Number'}</DescriptionText>
        <InfoText>{serialNumber}</InfoText>
      </VStack>
    </ResultInfoLayout>
  );
};

const ResultInfoLayout = styled(HStack, {
  base: {
    width: '100%',
    p: '24px',
    borderRadius: 'xl',
    backgroundColor: 'white',
    boxShadow: '1px 2px 4px 2px #00000040',
    gap: '24px',
  },
});

const Divider = styled('div', {
  base: {
    width: '1px',
    height: '40px',
    backgroundColor: 'gray.200',
  },
});

const DescriptionText = styled('p', {
  base: { color: 'gray.500', fontSize: 'sm' },
});

const InfoText = styled('p', {
  base: {
    color: 'blue.800',
    fontSize: 'lg',
    fontWeight: 600,
  },
});

ResultInfo.displayName = 'ResultInfo';

export default ResultInfo;

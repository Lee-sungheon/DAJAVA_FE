import { HStack, styled, VStack } from '@dajava/styled-system/jsx';

const ResultInfo = () => {
  return (
    <ResultInfoLayout>
      <VStack css={{ flex: 1, gap: '8px' }}>
        <DescriptionText>{'요청 URL'}</DescriptionText>
        <InfoText>{'www.naver.com'}</InfoText>
      </VStack>
      <Divider />
      <VStack css={{ flex: 1, gap: '8px' }}>
        <DescriptionText>{'Total Sessions'}</DescriptionText>
        <InfoText>{'1,094'}</InfoText>
      </VStack>
      <Divider />
      <VStack css={{ flex: 1, gap: '8px' }}>
        <DescriptionText>{'Serial Number'}</DescriptionText>
        <InfoText>{'8a2b-7b8c-rrsq-4i0z'}</InfoText>
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

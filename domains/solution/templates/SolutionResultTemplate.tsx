'use client';

import dynamic from 'next/dynamic';

import { HStack, VStack } from '@dajava/styled-system/jsx';

import HeatMapSkeleton from '../components/result/HeatMapSkeleton';
import ResultAISolutionLoading from '../components/result/ResultAISolutionLoading';
import ResultInfoSkeleton from '../components/result/ResultInfoSkeleton';
import ResultSideBar from '../components/result/ResultSideBar';

const ResultHeader = dynamic(() => import('../components/result/ResultHeader'), {
  ssr: false,
});
const ResultAISolution = dynamic(() => import('../components/result/ResultAISolution'), {
  ssr: false,
  loading: () => <ResultAISolutionLoading />,
});
const ResultInfo = dynamic(() => import('../components/result/ResultInfo'), {
  ssr: false,
  loading: () => <ResultInfoSkeleton />,
});
const ResultHeatMap = dynamic(() => import('../components/result/ResultHeatMap'), {
  ssr: false,
  loading: () => <HeatMapSkeleton />,
});

const SolutionResultTemplate = () => {
  return (
    <HStack
      css={{
        width: '100%',
        margin: '0 auto',
        px: '40px',
        gap: '40px',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <ResultSideBar />

      <VStack css={{ flex: 1, rowGap: '32px', alignItems: 'flex-start' }}>
        <ResultHeader />

        <VStack css={{ width: '100%', gap: '40px' }}>
          <ResultInfo />
          <ResultHeatMap />
          <ResultAISolution />
        </VStack>
      </VStack>
    </HStack>
  );
};

SolutionResultTemplate.displayName = 'SolutionResultTemplate';

export default SolutionResultTemplate;

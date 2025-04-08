import { css } from '@dajava/styled-system/css';
import { HStack, VStack } from '@dajava/styled-system/jsx';

import ResultAISolution from '../components/result/ResultAISolution';
import ResultController from '../components/result/ResultController';
import ResultHeatMap from '../components/result/ResultHeatMap';
import ResultInfo from '../components/result/ResultInfo';
import ResultSideBar from '../components/result/ResultSideBar';

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

      <VStack css={{ flex: 1, rowGap: '32px', alignItems: 'flex-start', maxWidth: '1024px' }}>
        <h2 className={css({ fontSize: '40px', fontWeight: 800, textShadow: '0px 4px 4px #00000040' })}>
          {'Solution Result'}
        </h2>

        <VStack css={{ width: '100%', gap: '40px' }}>
          <ResultInfo />
          <ResultHeatMap />
          <ResultAISolution />
        </VStack>
      </VStack>

      <ResultController />
    </HStack>
  );
};

SolutionResultTemplate.displayName = 'SolutionResultTemplate';

export default SolutionResultTemplate;

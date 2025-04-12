import { css } from '@dajava/styled-system/css';
import { VStack } from '@dajava/styled-system/jsx';

const ResultAISolutionLoading = () => {
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
      <div
        className={css({
          width: '200px',
          height: '24px',
          backgroundColor: 'gray.100',
          borderRadius: 'md',
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        })}
      />
      <hr className={css({ width: '100%', border: '1px dashed', borderColor: 'gray.200' })} />
      <div
        className={css({
          width: '100%',
          height: '200px',
          backgroundColor: 'gray.100',
          borderRadius: 'md',
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        })}
      />
    </VStack>
  );
};

ResultAISolutionLoading.displayName = 'ResultAISolutionLoading';

export default ResultAISolutionLoading;

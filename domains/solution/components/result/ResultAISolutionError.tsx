import { css } from '@dajava/styled-system/css';
import { VStack } from '@dajava/styled-system/jsx';

const ResultAISolutionError = () => {
  return (
    <VStack
      id={'solution'}
      css={{
        width: '100%',
        p: '24px',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        boxShadow: '1px 2px 4px 2px #00000040',
        rowGap: '16px',
        borderRadius: 'xl',
        minHeight: '300px',
      }}
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        })}
      >
        <div
          className={css({
            width: '48px',
            height: '48px',
            borderRadius: 'full',
            backgroundColor: 'red.100',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          })}
        >
          <span className={css({ color: 'red.500', fontSize: '24px' })}>{'!'}</span>
        </div>
        <p className={css({ color: 'gray.600', textAlign: 'center' })}>
          {'AI 솔루션을 불러오는 중 오류가 발생했습니다.'}
        </p>
      </div>
    </VStack>
  );
};

ResultAISolutionError.displayName = 'ResultAISolutionError';

export default ResultAISolutionError;

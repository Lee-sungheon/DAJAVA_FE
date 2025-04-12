import { css } from '@dajava/styled-system/css';

const ResultInfoSkeleton = () => {
  return (
    <div
      className={css({
        backgroundColor: 'gray.100',
        borderRadius: 'lg',
        position: 'relative',
        width: '100%',
        height: '95px',
        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      })}
    />
  );
};

ResultInfoSkeleton.displayName = 'ResultInfoSkeleton';

export default ResultInfoSkeleton;

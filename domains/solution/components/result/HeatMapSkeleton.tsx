import { css } from '@dajava/styled-system/css';

const HeatMapSkeleton = () => {
  return (
    <div
      className={css({
        backgroundColor: 'gray.100',
        borderRadius: 'lg',
        position: 'relative',
        width: '100%',
        height: '70vh',
        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      })}
    />
  );
};

HeatMapSkeleton.displayName = 'HeatMapSkeleton';

export default HeatMapSkeleton;

import { css } from '@dajava/styled-system/css';

const HeatMapError = () => {
  return (
    <div
      className={css({
        backgroundColor: 'gray.100',
        borderRadius: 'lg',
        position: 'relative',
        width: '100%',
        height: '40vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'red.500',
        fontSize: 'lg',
        fontWeight: 'bold',
      })}
    >
      {'히트맵을 불러오는 중 오류가 발생했습니다.'}
    </div>
  );
};

HeatMapError.displayName = 'HeatMapError';

export default HeatMapError;

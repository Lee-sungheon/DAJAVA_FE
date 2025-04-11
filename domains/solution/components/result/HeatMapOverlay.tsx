'use client';

import { css } from '@dajava/styled-system/css';
import { Box, styled } from '@dajava/styled-system/jsx';

interface HeatMapOverlayProps {
  x: number;
  y: number;
  data: {
    intensity: number;
    count: number;
  };
}

const HeatMapOverlay = ({ x, y, data }: HeatMapOverlayProps) => {
  return (
    <HeatMapOverlayBox style={{ left: `${x}%`, top: `${y}%` }}>
      <div className={css({ display: 'flex', flexDirection: 'column', gap: '8px' })}>
        <div className={css({ display: 'flex', justifyContent: 'space-between', alignItems: 'center' })}>
          <span className={css({ color: 'gray.600', fontSize: 'sm' })}>{'강도'}</span>
          <span className={css({ fontWeight: 'bold', color: 'blue.600' })}>{data.intensity}</span>
        </div>
        <div className={css({ display: 'flex', justifyContent: 'space-between', alignItems: 'center' })}>
          <span className={css({ color: 'gray.600', fontSize: 'sm' })}>{'횟수'}</span>
          <span className={css({ fontWeight: 'bold', color: 'blue.600' })}>{data.count}</span>
        </div>
      </div>
    </HeatMapOverlayBox>
  );
};

const HeatMapOverlayBox = styled(Box, {
  base: {
    position: 'absolute',
    backgroundColor: 'white',
    padding: '16px',
    borderRadius: 'lg',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    zIndex: 1000,
    minWidth: '240px',
    transform: 'translate(-50%, -100%)',
    marginTop: '-12px',
    border: '1px solid',
    borderColor: 'gray.200',
  },
});

HeatMapOverlay.displayName = 'HeatMapOverlay';

export default HeatMapOverlay;

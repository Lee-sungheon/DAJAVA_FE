'use client';

import { css } from '@dajava/styled-system/css';

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
    <div
      className={css({
        position: 'fixed',
        backgroundColor: 'white',
        padding: '12px',
        borderRadius: 'md',
        boxShadow: 'md',
        zIndex: 1000,
        minWidth: '200px',
      })}
      style={{
        left: x + 10,
        top: y + 10,
      }}
    >
      <p>{`강도: ${data.intensity}`}</p>
      <p>{`횟수: ${data.count}`}</p>
    </div>
  );
};

HeatMapOverlay.displayName = 'HeatMapOverlay';

export default HeatMapOverlay;

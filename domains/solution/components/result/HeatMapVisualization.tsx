'use client';

import { Heatmap, create } from 'heatmap.js';
import { useEffect, useRef } from 'react';

import { css } from '@dajava/styled-system/css';

import { ISolution } from '../../types/solution';

import HeatMapOverlay from './HeatMapOverlay';
import { HEAT_MAP_MOCK_DATA } from './ResultHeatMap';

interface HeatMapVisualizationProps {
  data: ISolution;
  hoveredCell: {
    x: number;
    y: number;
    data: (typeof HEAT_MAP_MOCK_DATA.gridCells)[0];
  } | null;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave: () => void;
}

const HeatMapVisualization = ({ data, hoveredCell, onMouseMove, onMouseLeave }: HeatMapVisualizationProps) => {
  const heatmapRef = useRef<HTMLDivElement>(null);
  const heatmapInstance = useRef<Heatmap<string, string, string>>(null);

  useEffect(() => {
    if (heatmapRef.current) {
      heatmapInstance.current = create({
        container: heatmapRef.current,
        radius: 20,
        maxOpacity: 0.6,
        minOpacity: 0,
        blur: 0.75,
      });

      const points = data.gridCells.map((cell) => ({
        x: (cell.gridX / data.gridSize) * data.pageWidth,
        y: (cell.gridY / data.gridSize) * data.pageHeight,
        value: cell.intensity,
        radius: ((cell.width + cell.height) / 2) * 20,
      }));

      heatmapInstance.current.setData({
        max: data.metadata.maxCount,
        min: 0,
        data: points,
      });
    }

    return () => {
      if (heatmapInstance.current) {
        heatmapInstance.current = null;
      }
    };
  }, [data]);

  return (
    <div
      ref={heatmapRef}
      className={css({
        backgroundColor: 'gray.100',
        borderRadius: 'lg',
        overflow: 'hidden',
        position: 'relative',
      })}
      style={{
        width: data.pageWidth,
        height: data.pageHeight,
      }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <img
        src={data.pageCapture}
        alt={'히트맵'}
        className={css({
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          position: 'absolute',
          top: 0,
          left: 0,
        })}
      />
      {hoveredCell && (
        <HeatMapOverlay
          x={hoveredCell.x}
          y={hoveredCell.y}
          data={{
            intensity: hoveredCell.data.intensity,
            count: hoveredCell.data.count,
          }}
        />
      )}
    </div>
  );
};

HeatMapVisualization.displayName = 'HeatMapVisualization';

export default HeatMapVisualization;

'use client';

import { Heatmap, create } from 'heatmap.js';
import { useEffect, useRef, useState } from 'react';

import { css } from '@dajava/styled-system/css';

import { ISolution } from '../../types/solution';

import HeatMapOverlay from './HeatMapOverlay';
import { HEAT_MAP_MOCK_DATA } from './ResultHeatMap';

interface HeatMapVisualizationProps {
  data: ISolution;
}

export const HeatMapVisualization = ({ data }: HeatMapVisualizationProps) => {
  const heatmapRef = useRef<HTMLDivElement>(null);
  const heatmapInstance = useRef<Heatmap<string, string, string>>(null);
  const [hoveredCell, setHoveredCell] = useState<{
    x: number;
    y: number;
    data: (typeof HEAT_MAP_MOCK_DATA.gridCells)[0];
  } | null>(null);

  useEffect(() => {
    if (heatmapRef.current) {
      const container = heatmapRef.current;
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      heatmapInstance.current = create({
        container: container,
        radius: 20,
        maxOpacity: 0.6,
        minOpacity: 0,
        blur: 0.75,
      });

      const points = data.gridCells.map((cell) => ({
        x: (cell.gridX / data.gridSize) * containerWidth,
        y: (cell.gridY / data.gridSize) * containerHeight,
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const closestCell = data.gridCells.reduce(
      (closest, cell) => {
        const cellX = (cell.gridX / data.gridSize) * rect.width;
        const cellY = (cell.gridY / data.gridSize) * rect.height;
        const distance = Math.sqrt(Math.pow(x - cellX, 2) + Math.pow(y - cellY, 2));

        if (!closest || distance < closest.distance) {
          return { cell, distance };
        }
        return closest;
      },
      null as { cell: (typeof data.gridCells)[0]; distance: number } | null,
    );

    if (closestCell && closestCell.distance < 50) {
      setHoveredCell({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        data: closestCell.cell,
      });
    } else {
      setHoveredCell(null);
    }
  };

  return (
    <div
      ref={heatmapRef}
      className={css({
        backgroundColor: 'gray.100',
        borderRadius: 'lg',
        position: 'relative',
        width: '100%',
        height: '100%',
        aspectRatio: '658/1406',
      })}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredCell(null)}
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

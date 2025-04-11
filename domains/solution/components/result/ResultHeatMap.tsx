'use client';

import { useState } from 'react';

import { VStack } from '@dajava/styled-system/jsx';

import { ISolution } from '../../types/solution';

import HeatMapControls from './HeatMapControls';
import HeatMapVisualization from './HeatMapVisualization';

type HeatMapType = 'click' | 'mouse' | 'scroll';

const ResultHeatMap = () => {
  const [selectedType, setSelectedType] = useState<HeatMapType>('click');
  const [hoveredCell, setHoveredCell] = useState<{
    x: number;
    y: number;
    data: (typeof HEAT_MAP_MOCK_DATA.gridCells)[0];
  } | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const closestCell = HEAT_MAP_MOCK_DATA.gridCells.reduce(
      (closest, cell) => {
        const cellX = (cell.gridX / HEAT_MAP_MOCK_DATA.gridSize) * HEAT_MAP_MOCK_DATA.pageWidth;
        const cellY = (cell.gridY / HEAT_MAP_MOCK_DATA.gridSize) * HEAT_MAP_MOCK_DATA.pageHeight;
        const distance = Math.sqrt(Math.pow(x - cellX, 2) + Math.pow(y - cellY, 2));

        if (!closest || distance < closest.distance) {
          return { cell, distance };
        }
        return closest;
      },
      null as { cell: (typeof HEAT_MAP_MOCK_DATA.gridCells)[0]; distance: number } | null,
    );

    if (closestCell && closestCell.distance < 50) {
      setHoveredCell({
        x: e.clientX,
        y: e.clientY,
        data: closestCell.cell,
      });
    } else {
      setHoveredCell(null);
    }
  };

  return (
    <VStack
      id={'heatmap'}
      css={{
        width: '100%',
        p: '24px',
        borderRadius: 'xl',
        backgroundColor: 'white',
        boxShadow: '1px 2px 4px 2px #00000040',
        gap: '24px',
      }}
    >
      <HeatMapControls selectedType={selectedType} onTypeChange={setSelectedType} />
      <HeatMapVisualization
        data={HEAT_MAP_MOCK_DATA}
        hoveredCell={hoveredCell}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredCell(null)}
      />
    </VStack>
  );
};

export const HEAT_MAP_MOCK_DATA: ISolution = {
  gridSize: 1000,
  pageWidth: 658,
  pageHeight: 1406,
  pageCapture: '/heatmap-example.png',
  gridCells: [
    ...Array.from({ length: 5 }, (_, i) => ({
      gridX: Math.floor(100 + Math.sin(i / 5) * 50),
      gridY: Math.floor(100 + i * 2),
      count: Math.floor(10 + Math.random() * 10),
      intensity: Math.floor(20 + Math.random() * 20),
      width: 1 + Math.random() * 2,
      height: 1 + Math.random() * 2,
    })),
    ...Array.from({ length: 10 }, (_, i) => ({
      gridX: Math.floor(400 + Math.cos(i / 10) * 100),
      gridY: Math.floor(500 + Math.sin(i / 10) * 100),
      count: Math.floor(20 + Math.random() * 20),
      intensity: Math.floor(40 + Math.random() * 30),
      width: 2 + Math.random() * 3,
      height: 2 + Math.random() * 3,
    })),
    ...Array.from({ length: 8 }, (_, i) => ({
      gridX: Math.floor(600 + Math.sin(i / 8) * 30),
      gridY: Math.floor(800 + i * 3),
      count: Math.floor(15 + Math.random() * 15),
      intensity: Math.floor(30 + Math.random() * 25),
      width: 1.5 + Math.random() * 2,
      height: 1.5 + Math.random() * 2,
    })),
    ...Array.from({ length: 15 }, (_, i) => ({
      gridX: Math.floor(300 + Math.cos(i / 15) * 150),
      gridY: Math.floor(700 + Math.sin(i / 15) * 150),
      count: Math.floor(25 + Math.random() * 25),
      intensity: Math.floor(50 + Math.random() * 40),
      width: 1 + Math.random() * 4,
      height: 1 + Math.random() * 4,
    })),
    ...Array.from({ length: 20 }, () => ({
      gridX: Math.floor(Math.random() * 1000),
      gridY: Math.floor(Math.random() * 1000),
      count: Math.floor(5 + Math.random() * 15),
      intensity: Math.floor(10 + Math.random() * 30),
      width: 1 + Math.random() * 3,
      height: 1 + Math.random() * 3,
    })),
  ],
  metadata: {
    maxCount: 100,
    totalEvents: 2000,
    pageUrl: 'https://example.com/page',
    totalSessions: 50,
    firstEventTime: '2025-04-11T16:53:24.594Z',
    lastEventTime: '2025-04-11T16:53:24.594Z',
  },
};

ResultHeatMap.displayName = 'ResultHeatMap';

export default ResultHeatMap;

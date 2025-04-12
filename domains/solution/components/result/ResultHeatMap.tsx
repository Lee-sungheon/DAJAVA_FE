'use client';

import { useState } from 'react';

import { VStack } from '@dajava/styled-system/jsx';

import { THeatmapType } from '../../types/solution';

import HeatMapControls from './HeatMapControls';
import HeatMapVisualization from './HeatMapVisualization';

const ResultHeatMap = () => {
  const [selectedType, setSelectedType] = useState<THeatmapType>('click');

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
      <HeatMapVisualization type={selectedType} />
    </VStack>
  );
};

export default ResultHeatMap;

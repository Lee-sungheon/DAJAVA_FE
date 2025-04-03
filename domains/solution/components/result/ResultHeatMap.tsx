'use client';

import { useState } from 'react';

import { css } from '@dajava/styled-system/css';
import { HStack, VStack } from '@dajava/styled-system/jsx';

type HeatMapType = 'click' | 'mouse' | 'scroll';

const HEAT_MAP_OPTIONS = [
  { value: 'click', label: '클릭' },
  { value: 'mouse', label: '마우스 이동' },
  { value: 'scroll', label: '스크롤' },
] as const;

const ResultHeatMap = () => {
  const [selectedType, setSelectedType] = useState<HeatMapType>('click');

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
      <HStack css={{ width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
        <p className={css({ fontSize: 'xl', fontWeight: 600 })}>{'히트 맵'}</p>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value as HeatMapType)}
          className={css({
            p: '8px 16px',
            borderRadius: 'md',
            border: '1px solid',
            borderColor: 'gray.200',
            outline: 'none',
            _focus: { borderColor: 'blue.500' },
          })}
        >
          {HEAT_MAP_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </HStack>

      <div
        className={css({
          width: '100%',
          backgroundColor: 'gray.100',
          borderRadius: 'lg',
          overflow: 'hidden',
        })}
      >
        <img src={'/heatmap-example.png'} alt={'히트맵'} className={css({ width: '100%', objectFit: 'contain' })} />
      </div>
    </VStack>
  );
};

export default ResultHeatMap;

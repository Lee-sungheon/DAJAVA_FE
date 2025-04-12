'use client';

import { css } from '@dajava/styled-system/css';
import { HStack } from '@dajava/styled-system/jsx';

import { THeatmapType } from '../../types/solution';

const HEAT_MAP_OPTIONS = [
  { value: 'click', label: '클릭' },
  { value: 'move', label: '마우스 이동' },
  { value: 'scroll', label: '스크롤' },
] as const;

interface HeatMapControlsProps {
  selectedType: THeatmapType;
  onTypeChange: (type: THeatmapType) => void;
}

const HeatMapControls = ({ selectedType, onTypeChange }: HeatMapControlsProps) => {
  return (
    <HStack css={{ width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
      <p className={css({ fontSize: 'xl', fontWeight: 600 })}>{'히트 맵'}</p>
      <select
        value={selectedType}
        onChange={(e) => onTypeChange(e.target.value as THeatmapType)}
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
  );
};

HeatMapControls.displayName = 'HeatMapControls';

export default HeatMapControls;

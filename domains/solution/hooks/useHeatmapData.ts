import { Heatmap, create } from 'heatmap.js';
import { useCallback, useRef } from 'react';

import { ISolution } from '../types/solution';

export const useHeatmapData = (data: ISolution | undefined) => {
  const heatmapInstance = useRef<Heatmap<string, string, string>>(null);

  const refCallback = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || !data) {
        return;
      }

      const container = node;

      const existingCanvas = container.querySelector('.heatmap-canvas');
      if (existingCanvas) {
        console.log('Removing existing canvas');
        container.removeChild(existingCanvas);
      }

      try {
        heatmapInstance.current = create({
          container: container,
          radius: 20,
          maxOpacity: 0.6,
          minOpacity: 0,
          blur: 0.75,
        });

        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;

        const points = data.gridCells.map((cell) => {
          const x = (cell.gridX / (data.gridSizeX ?? data.gridSize)) * containerWidth;
          const y = (cell.gridY / (data.gridSizeY ?? data.gridSize)) * containerHeight;
          const value = cell.intensity;
          const radius = ((cell.width + cell.height) / 2) * 20;

          return { x, y, value, radius };
        });

        heatmapInstance.current.setData({
          max: data.metadata.maxCount,
          min: 0,
          data: points,
        });
      } catch (error) {
        console.error('Error initializing heatmap:', error);
      }
    },
    [data],
  );

  return refCallback;
};

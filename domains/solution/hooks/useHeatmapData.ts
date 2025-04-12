import { Heatmap, create } from 'heatmap.js';
import { useEffect, useRef } from 'react';

import { ISolution } from '../types/solution';

export const useHeatmapData = (data: ISolution | undefined) => {
  const heatmapRef = useRef<HTMLDivElement>(null);
  const heatmapInstance = useRef<Heatmap<string, string, string>>(null);

  useEffect(() => {
    if (heatmapRef.current && data) {
      const container = heatmapRef.current;
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      const existingCanvas = container.querySelector('.heatmap-canvas');
      if (existingCanvas) {
        container.removeChild(existingCanvas);
      }

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

  return heatmapRef;
};

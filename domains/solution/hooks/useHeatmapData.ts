import { Heatmap, create } from 'heatmap.js';
import { useCallback, useEffect, useRef } from 'react';

import { ISolution } from '../types/solution';

export const useHeatmapData = (data: ISolution | undefined) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const heatmapInstance = useRef<Heatmap<string, string, string> | null>(null);

  const initializeHeatmap = useCallback(() => {
    if (!containerRef.current || !data) {
      return;
    }

    const container = containerRef.current;

    const existingCanvas = container.querySelector('.heatmap-canvas');
    if (existingCanvas) {
      container.removeChild(existingCanvas);
    }

    try {
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      const baseRadius = Math.min(containerWidth, containerHeight) / 30;
      const radius = Math.max(baseRadius, 10);

      heatmapInstance.current = create({
        container: container,
        radius: radius,
        maxOpacity: 0.6,
        minOpacity: 0,
        blur: 0.75,
      });

      const points = data.gridCells.map((cell) => {
        const x = (cell.gridX / data.gridSizeX) * containerWidth;
        const y = (cell.gridY / data.gridSizeY) * containerHeight;
        const value = cell.intensity;

        return { x, y, value, radius };
      });

      heatmapInstance.current.setData({
        max: data.metadata.maxCount,
        min: 0,
        data: points,
      });
    } catch (error) {
      console.error('히트맵 초기화 중 오류:', error);
    }
  }, [data]);

  const refCallback = useCallback(
    (node: HTMLDivElement | null) => {
      containerRef.current = node;
      if (node) {
        initializeHeatmap();
      }
    },
    [initializeHeatmap],
  );

  useEffect(() => {
    const handleResize = () => {
      initializeHeatmap();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initializeHeatmap]);

  return refCallback;
};

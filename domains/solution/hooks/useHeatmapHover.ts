import { useState } from 'react';

import { ISolution } from '../types/solution';

export const useHeatmapHover = (data: ISolution | undefined) => {
  const [hoveredCell, setHoveredCell] = useState<{
    x: number;
    y: number;
    data: ISolution['gridCells'][0];
  } | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!data) return;

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

  return {
    hoveredCell,
    handleMouseMove,
    handleMouseLeave: () => setHoveredCell(null),
  };
};

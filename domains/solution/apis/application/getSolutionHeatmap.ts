import { useQuery } from '@tanstack/react-query';

import { get } from '@dajava/utils/api';

import { ISolution, THeatmapType } from '../../types/solution';

const generateGetSolutionHeatmapKey = (serialNumber: string, password: string, type: THeatmapType) => {
  return ['solutionHeatmap', serialNumber, password, type];
};

async function fetchSolutionHeatmap(serialNumber: string, password: string, type: THeatmapType) {
  const response = await get<ISolution>(`/v1/solution/heatmap/${serialNumber}/${password}?type=${type}`);
  return response.data;
}

export const useGetSolutionHeatmap = (serialNumber: string, password: string, type: THeatmapType) => {
  return useQuery({
    queryKey: generateGetSolutionHeatmapKey(serialNumber, password, type),
    queryFn: () => fetchSolutionHeatmap(serialNumber, password, type),
    enabled: !!serialNumber && !!password && !!type,
    staleTime: 0,
  });
};

import { useQuery } from '@tanstack/react-query';

import { get } from '@dajava/utils/api';

const generateGetSolutionPageCaptureKey = (pageCapture: string) => {
  return ['solutionPageCapture', pageCapture];
};

const fetchSolutionPageCapture = async (pageCapture: string) => {
  const response = await get<Blob>(`/v1/images/${pageCapture}`, {
    responseType: 'blob',
  });
  return response.data;
};

export const useGetSolutionPageCapture = (pageCapture: string) => {
  return useQuery({
    queryKey: generateGetSolutionPageCaptureKey(pageCapture),
    queryFn: () => fetchSolutionPageCapture(pageCapture),
    enabled: !!pageCapture,
  });
};

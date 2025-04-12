import { useQuery } from '@tanstack/react-query';

import { get } from '@dajava/utils/api';

interface ISolutionInfoResponse {
  text: string;
}

const generateGetSolutionInfoKey = (serialNumber: string, password: string) => {
  return ['solutionInfo', serialNumber, password];
};

const fetchSolutionInfo = async (serialNumber: string, password: string) => {
  const response = await get<ISolutionInfoResponse>(`/v1/solution/info/${serialNumber}/${password}`);
  return response.data;
};

export const useGetSolutionInfo = (serialNumber: string, password: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: generateGetSolutionInfoKey(serialNumber, password),
    queryFn: () => fetchSolutionInfo(serialNumber, password),
    enabled: !!serialNumber && !!password,
  });

  return { data, isLoading, error };
};

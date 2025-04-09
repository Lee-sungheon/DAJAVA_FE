import { useInfiniteQuery } from '@tanstack/react-query';

import { proxyGet } from '@dajava/utils/api';

import { TStatusType } from '../../types/management';

interface IAdminRegistersRequest {
  pageNum: number;
  pageSize: number;
}

interface IAdminRegistersResponse {
  registerInfos: IRegisterInfo[];
}

export interface IRegisterInfo {
  id: number;
  serialNumber: string;
  email: string;
  url: string;
  solutionDate: string;
  solutionStartDate: string;
  solutionEndDate: string;
  eventState: TStatusType;
  completed: boolean;
}

const generateGetAdminRegistersKey = ({ pageNum, pageSize }: IAdminRegistersRequest) => {
  const queryString = `pageNum=${pageNum}&pageSize=${pageSize}`;
  return `/v1/registers?${queryString}`;
};

export const fetchGetAdminRegisters = async (requestData: IAdminRegistersRequest) => {
  const path = generateGetAdminRegistersKey(requestData);
  const response = await proxyGet<IAdminRegistersResponse>(path);
  return response.data;
};

export const useGetAdminRegisters = (requestData: IAdminRegistersRequest) => {
  const { data, isLoading, hasNextPage } = useInfiniteQuery<IAdminRegistersResponse>({
    queryKey: [generateGetAdminRegistersKey(requestData)],
    queryFn: () => fetchGetAdminRegisters(requestData),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.registerInfos.length > pages.length ? pages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });

  return {
    data: data ? data.pages[0].registerInfos : [],
    isLoading,
    hasNextPage,
  };
};

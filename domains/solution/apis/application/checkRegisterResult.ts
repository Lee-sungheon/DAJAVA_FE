import { useMutation } from '@tanstack/react-query';

import { useAlert } from '@dajava/hooks/useAlert';
import { post } from '@dajava/utils/api';

interface ICheckRegisterResultRequest {
  serialNumber: string;
  password: string;
}

interface ICheckRegisterResultResponse {
  isExist: boolean;
}

export const checkRegisterResult = async (requestData: ICheckRegisterResultRequest) => {
  const response = await post<ICheckRegisterResultResponse, ICheckRegisterResultRequest>(
    '/v1/register/check',
    requestData,
  );
  return response.data;
};

export const useCheckRegisterResult = () => {
  const { alert } = useAlert();

  return useMutation({
    mutationFn: checkRegisterResult,
    onError: (error) => {
      alert({
        title: '솔루션 정보 확인에 실패했습니다',
        content: error?.message,
        status: 'error',
      });
    },
  });
};

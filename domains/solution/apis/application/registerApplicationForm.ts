import { useMutation } from '@tanstack/react-query';

import { useAlert } from '@dajava/hooks/useAlert';
import { post } from '@dajava/utils/api';

import { IApplicationForm } from '../../types/application';

interface ISubmitApplicationResponse {
  serialNumber: string;
}

export const submitApplication = async (data: IApplicationForm) => {
  const response = await post<ISubmitApplicationResponse>('/v1/register', data);
  return response.data;
};

export const useSubmitApplication = () => {
  const { alert } = useAlert();

  return useMutation({
    mutationFn: submitApplication,
    onSuccess: (result) => {
      alert({
        title: '솔루션 서비스 신청이 완료되었습니다',
        content: `시리얼 넘버는 ${result.serialNumber}입니다.\n솔루션 시리얼 넘버는 이메일로 확인 가능합니다.`,
      });
    },
    onError: (error) => {
      alert({
        title: '솔루션 서비스 신청에 실패했습니다',
        content: error?.message,
        status: 'error',
      });
    },
  });
};

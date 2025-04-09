import { useMutation } from '@tanstack/react-query';

import { useAlert } from '@dajava/hooks/useAlert';
import { proxyPost } from '@dajava/utils/api';

import { IAdminAuthForm } from '../../types/auth';

interface ISubmitAdminAuthResponse {
  serialNumber: string;
}

export const submitAdminAuth = async (data: IAdminAuthForm) => {
  const path = `/v1/register/admin?adminCode=${data.adminCode}`;

  return await proxyPost<ISubmitAdminAuthResponse>(path, {}, undefined);
};

export const useSubmitAdminAuth = () => {
  const { alert } = useAlert();

  return useMutation({
    mutationFn: submitAdminAuth,
    onError: (error) => {
      alert({
        title: '어드민 인증에 실패했습니다',
        content: error?.message,
        status: 'error',
      });
    },
  });
};

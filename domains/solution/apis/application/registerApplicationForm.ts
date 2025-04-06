import { useMutation } from '@tanstack/react-query';

import { post } from '@dajava/utils/api';

import { IApplicationForm } from '../../types/application';

interface ISubmitApplicationResponse {
  serialNumber: string;
}

export const submitApplication = async (data: IApplicationForm) => {
  return await post<ISubmitApplicationResponse>('/v1/register', data);
};

export const useSubmitApplication = () => {
  return useMutation({
    mutationFn: submitApplication,
    onSuccess: () => {
      console.log('Application submitted successfully');
    },
    onError: (error) => {
      console.error('Error submitting application:', error);
    },
  });
};

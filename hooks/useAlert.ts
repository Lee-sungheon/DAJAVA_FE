import { useAtom } from 'jotai';

import { alertAtom, IAlertState } from '@dajava/stores/alert';

export const useAlert = () => {
  const [, setAlert] = useAtom(alertAtom);

  return {
    alert: (props: Omit<IAlertState, 'isOpen'>) => {
      setAlert({ isOpen: true, ...props });
    },
  };
};

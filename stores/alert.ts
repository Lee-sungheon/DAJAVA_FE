import { atom } from 'jotai';

export interface IAlertState {
  isOpen: boolean;
  status?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  content?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const alertAtom = atom<IAlertState>({
  isOpen: false,
});

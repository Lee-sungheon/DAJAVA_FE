import { format } from 'date-fns/format';

export const getPageRange = (start: number, end: number) => {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

export const getVisiblePages = (currentPage: number, totalPages: number) => {
  const maxVisiblePages = 5;
  const halfVisible = Math.floor(maxVisiblePages / 2);

  const startPage = Math.max(1, Math.min(currentPage - halfVisible, totalPages - maxVisiblePages + 1));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  return { startPage, endPage };
};

export const getFormattedDate = (date: string) => {
  return format(new Date(date), 'yyyy-MM-dd HH:mm');
};

import { format } from 'date-fns';

export const formatMoney = (amount: number): string => {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (date: string, formatStr = 'dd/MM/yyyy'): string => {
  return format(new Date(date), formatStr);
};

export const formatDateTime = (
  date: string,
  formatStr = 'dd/MM/yyyy HH:mm'
): string => {
  return formatDate(date, formatStr);
};

import { MONTH } from '../constants/date.constant';

export const getInitialAndEndDateByMonth = (
  year: number,
  month: MONTH
): { initialDate: string; endDate: string } => {
  const monthMap = {
    [MONTH.JANUARY]: 0,
    [MONTH.FEBRUARY]: 1,
    [MONTH.MARCH]: 2,
    [MONTH.APRIL]: 3,
    [MONTH.MAY]: 4,
    [MONTH.JUNE]: 5,
    [MONTH.JULY]: 6,
    [MONTH.AUGUST]: 7,
    [MONTH.SEPTEMBER]: 8,
    [MONTH.OCTOBER]: 9,
    [MONTH.NOVEMBER]: 10,
    [MONTH.DECEMBER]: 11,
  };

  const mappedMonth = monthMap[month];
  const monthNumber = mappedMonth + 1;
  const initialDate = `${year}-${monthNumber
    .toString()
    .padStart(2, '0')}-01 00:00:00`;
  const lastDay = new Date(year, monthNumber, 0).getDate();
  const endDate = `${year}-${monthNumber
    .toString()
    .padStart(2, '0')}-${lastDay} 23:59:59`;

  return {
    initialDate,
    endDate,
  };
};

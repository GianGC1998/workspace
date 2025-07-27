import { MONTH } from '@workspace/api-types';
import { Select, SelectProps } from 'antd';
import { FC } from 'react';

const MONTHS = Object.values(MONTH).map((month) => ({
  label: month,
  value: month,
}));

type MonthSelectProps = Omit<SelectProps<MONTH>, 'options'>;

export const MonthSelect: FC<MonthSelectProps> = (props) => {
  return <Select options={MONTHS} {...props} />;
};

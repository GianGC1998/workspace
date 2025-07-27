import { Select, SelectProps } from 'antd';
import { FC, useMemo } from 'react';

type YearSelectProps = Omit<SelectProps<number>, 'options'> & {
  startYear?: number;
};

export const YearSelect: FC<YearSelectProps> = ({
  startYear = 2020,
  ...props
}) => {
  const yearsOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const length = currentYear - startYear + 1;

    return Array.from({ length }, (_, i) => startYear + i).map((year) => ({
      label: year.toString(),
      value: year,
    }));
  }, [startYear]);

  return <Select options={yearsOptions} {...props} />;
};

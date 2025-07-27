import { FC } from 'react';
import clsx from 'clsx';

type FormControlProps = {
  label: string;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  children?: React.ReactNode;
};

export const FormControl: FC<FormControlProps> = ({
  label,
  className,
  orientation = 'vertical',
  children,
}) => {
  return (
    <div
      className={clsx('flex', className, {
        'flex-col': orientation === 'vertical',
        'flex-row items-center': orientation === 'horizontal',
      })}
    >
      <label
        className={clsx('text-sm font-medium', {
          'mb-0.5': orientation === 'vertical',
          'mr-2': orientation === 'horizontal',
        })}
      >
        {label}
      </label>
      {children}
    </div>
  );
};

import { FC } from 'react';
import clsx from 'clsx';

type LogoProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  className?: string;
};

export const Logo: FC<LogoProps> = ({ ...props }) => {
  const { className, ...rest } = props;
  return (
    <img
      className={clsx('invert', className)}
      src="/images/logo.png"
      alt="Logo"
      {...rest}
    />
  );
};

import { FC } from 'react';

type FieldMessageProps = {
  message?: string;
};

export const FieldMessage: FC<FieldMessageProps> = ({ message }) => {
  return <span className="input-error-feedback text-sm">{message}</span>;
};

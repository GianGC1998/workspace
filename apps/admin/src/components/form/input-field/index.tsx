import { FC } from 'react';
import { Input, InputProps } from 'antd';
import { RegisterOptions, useController } from 'react-hook-form';
import clsx from 'clsx';
import { FieldMessage } from '../field-message';
import { FormControl } from '../form-control';

type InputFieldProps = InputProps & {
  name: string;
  label?: string;
  control: any;
  rules?: Omit<
    RegisterOptions<any, any>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  containerClassName?: string;
};

export const InputField: FC<InputFieldProps> = ({
  name,
  control,
  onChange,
  onBlur,
  className,
  containerClassName,
  label,
  rules,
  ...rest
}) => {
  const { field, fieldState } = useController({ name, control, rules });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(e);
    onChange?.(e);
  };

  const renderInput = () => (
    <>
      <Input
        {...rest}
        name={name}
        onChange={handleChange}
        onBlur={(e) => {
          field.onBlur();
          onBlur?.(e);
        }}
        value={field.value}
        ref={field.ref}
        className={clsx('form-input', className, {
          'has-error': fieldState.invalid,
        })}
      />
      {fieldState.invalid && (
        <FieldMessage message={fieldState.error?.message} />
      )}
    </>
  );

  if (label) {
    return (
      <FormControl label={label} className={containerClassName}>
        {renderInput()}
      </FormControl>
    );
  }

  return <div className={containerClassName}>{renderInput()}</div>;
};

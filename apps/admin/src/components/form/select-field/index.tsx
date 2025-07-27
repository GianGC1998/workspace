import { FC } from 'react';
import { Select, SelectProps } from 'antd';
import { RegisterOptions, useController } from 'react-hook-form';
import clsx from 'clsx';
import { FieldMessage } from '../field-message';
import { FormControl } from '../form-control';
import { useTranslation } from '../../../i18n/hooks/useTranslation';

type SelectOption = {
  label: string;
  value: string | number;
  disabled?: boolean;
};

type SelectFieldProps = Omit<SelectProps, 'options'> & {
  name: string;
  label?: string;
  control: any;
  options: SelectOption[];
  rules?: Omit<
    RegisterOptions<any, any>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  containerClassName?: string;
};

export const SelectField: FC<SelectFieldProps> = ({
  name,
  control,
  onChange,
  onBlur,
  className,
  containerClassName,
  label,
  rules,
  options,
  placeholder,
  ...rest
}) => {
  const { field, fieldState } = useController({ name, control, rules });
  const { t } = useTranslation();

  const handleChange = (value: any) => {
    field.onChange(value);
    onChange?.(value);
  };

  const renderSelect = () => (
    <>
      <Select
        {...rest}
        options={options}
        onChange={handleChange}
        onBlur={(e) => {
          field.onBlur();
          onBlur?.(e);
        }}
        value={field.value}
        placeholder={placeholder || t('form.selectPlaceholder')}
        className={clsx('form-select', className, {
          'has-error': fieldState.invalid,
        })}
        status={fieldState.invalid ? 'error' : undefined}
      />
      {fieldState.invalid && (
        <FieldMessage message={fieldState.error?.message} />
      )}
    </>
  );

  if (label) {
    return (
      <FormControl label={label} className={containerClassName}>
        {renderSelect()}
      </FormControl>
    );
  }

  return <div className={containerClassName}>{renderSelect()}</div>;
};

import { DetailedHTMLProps, FC, SelectHTMLAttributes, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';

type DropdownProps = Omit<
  DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>,
  'form'
> & {
  className?: string;
  options: Record<string, string>;
  initialSelection?: string;
  placeholderOptionText?: string;
  name: string;
  form: UseFormReturn<any>;
};

const Dropdown: FC<DropdownProps> = ({
  className = '',
  options,
  initialSelection,
  placeholderOptionText = 'Choose',
  name,
  form,
  ...otherProps
}) => {
  useEffect(() => {
    form.setValue(name, initialSelection);
  }, [form, initialSelection, name, options]);

  return (
    <div>
      <select
        className={
          'select font-normal ' +
          (form.formState.errors[name] ? 'select-error ' : 'select-bordered ') +
          className
        }
        {...otherProps}
        {...form.register(name)}>
        {!initialSelection && (
          <option disabled selected>
            {placeholderOptionText}
          </option>
        )}
        {Object.entries(options).map(([key, val]) => (
          <option key={key} value={key}>
            {val}
          </option>
        ))}
      </select>
      {form.formState.errors[name]?.message && (
        <small className="font-bold text-error">
          {form.formState.errors[name]?.message?.toString()}
        </small>
      )}
    </div>
  );
};

export default Dropdown;

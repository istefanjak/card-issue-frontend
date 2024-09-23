import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';
import { UseFormReturn } from 'react-hook-form';

type InputProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'form'
> & {
  className?: string;
  label: string;
  name: string;
  form: UseFormReturn<any>;
};

const Input: FC<InputProps> = ({ className = '', label, name, form, ...otherProps }) => {
  return (
    <div>
      <label
        className={
          'input input-bordered flex items-center gap-3 font-bold ' + (form.formState.errors[name]
            ? 'input-error '
            : '') + className
        }>
        {label}
        <input type="text" className="font-normal grow" {...otherProps} {...form.register(name)} />
      </label>
      {form.formState.errors[name]?.message && (
        <small className="font-bold text-error">
          {form.formState.errors[name]?.message?.toString()}
        </small>
      )}
    </div>
  );
};

export default Input;

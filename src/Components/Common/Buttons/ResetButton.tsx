import { FC } from 'react';
import { UseFormReset } from 'react-hook-form';

const ResetButton: FC<{ label?: string; reset: UseFormReset<any> }> = ({
  label = 'Reset',
  reset,
}) => {
  return (
    <button className="btn" type="button" onClick={() => reset()}>
      {label}
    </button>
  );
};

export default ResetButton;

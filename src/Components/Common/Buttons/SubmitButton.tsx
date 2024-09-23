import { FC } from 'react';

const SubmitButton: FC<{ label?: string; loading?: boolean }> = ({
  label = 'Submit',
  loading = false,
}) => {
  return (
    <button className="btn btn-primary" disabled={loading} type="submit">
      {label}
    </button>
  );
};

export default SubmitButton;

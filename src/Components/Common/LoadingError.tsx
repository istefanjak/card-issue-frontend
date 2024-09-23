import { FC } from 'react';
import { X } from '@phosphor-icons/react';

const LoadingError: FC<{ message?: string }> = ({ message = 'An error has occurred' }) => {
  return (
    <div className="badge badge-error gap-2">
      <X />
      {message}
    </div>
  );
};

export default LoadingError;

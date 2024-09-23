import { FC } from 'react';
import { X } from '@phosphor-icons/react';

const CancelButton: FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button type="button" className="btn btn-ghost text-error" onClick={onClick}>
      <X size={20} weight="bold" />
      <span>Cancel</span>
    </button>
  );
};

export default CancelButton;

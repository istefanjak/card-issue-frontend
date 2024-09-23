import { FC } from 'react';
import { Pencil } from '@phosphor-icons/react';

const EditButton: FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button type="button" className="btn btn-xs btn-ghost" onClick={onClick}>
      <Pencil size={20} className="text-primary" />
    </button>
  );
};

export default EditButton;

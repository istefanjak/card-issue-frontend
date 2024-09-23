import { FC } from 'react';
import { Plus } from '@phosphor-icons/react';

const AddButton: FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button type="button" className="btn btn-ghost text-success" onClick={onClick}>
      <Plus size={20} weight="bold" />
      <span>Add</span>
    </button>
  );
};

export default AddButton;

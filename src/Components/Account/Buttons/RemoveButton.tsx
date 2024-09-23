import { FC } from 'react';
import { Trash } from '@phosphor-icons/react';

type RemoveButtonProps = {
  onClick: () => void;
  label?: string;
};

const RemoveButton: FC<RemoveButtonProps> = ({ onClick, label }) => {
  return (
    <button type="button" className="btn btn-xs btn-ghost text-error" onClick={onClick}>
      <Trash size={20} />
      {label}
    </button>
  );
};

export default RemoveButton;

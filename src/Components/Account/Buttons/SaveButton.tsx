import { FC } from 'react';
import { FloppyDisk } from '@phosphor-icons/react';

const SaveButton: FC = () => {
  return (
    <button type="submit" className="btn btn-ghost text-success">
      <FloppyDisk size={20} weight="bold" />
      <span>Save</span>
    </button>
  );
};

export default SaveButton;

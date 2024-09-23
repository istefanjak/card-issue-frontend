import { FC, Fragment } from 'react';
import RemoveButton from 'Components/Account/Buttons/RemoveButton';
import { deleteAccount } from 'Services/AccountService';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

type AccountDataDisplayProps = {
  data: Record<string, string>;
};

const AccountDataDisplay: FC<AccountDataDisplayProps> = ({ data }) => {
  const navigate = useNavigate();

  const onRemoveClick = async () => {
    await deleteAccount(data['OIB']);
    toast.success('Account deleted successfully');
    navigate('/search');
  };

  return (
    <div className="card bg-base-100 shadow-xl w-96">
      <div className="card-body">
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(data).map(([key, val]) => (
            <Fragment key={key}>
              <div className="font-bold">{key}</div>
              <div>{val}</div>
            </Fragment>
          ))}
        </div>
      </div>

      <div className="p-2 flex justify-end">
        <RemoveButton label="Remove account" onClick={onRemoveClick} />
      </div>
    </div>
  );
};

export default AccountDataDisplay;

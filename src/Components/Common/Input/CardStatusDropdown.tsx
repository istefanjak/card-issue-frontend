import { FC } from 'react';
import Dropdown from 'Components/Common/Input/Generic/Dropdown';
import { CardStatus } from 'Models/CardStatus';
import { UseFormReturn } from 'react-hook-form';
import * as Yup from 'yup';

export const CardStatusDropdownSchema = Yup.string()
  .oneOf(['PENDING', 'APPROVED', 'REJECTED'], 'Invalid status')
  .required('This field is required');

type CardStatusDropdownProps = {
  statuses: CardStatus[];
  initialSelection?: CardStatus;
  name: string;
  form: UseFormReturn<any>;
};

const CardStatusDropdown: FC<CardStatusDropdownProps> = ({ statuses, ...otherProps }) => {
  const getCardStatusOptions = (): Record<string, string> => {
    let ret: Record<string, string> = {};
    statuses.forEach((status) => (ret = { ...ret, [status]: status }));
    return ret;
  };

  return <Dropdown options={getCardStatusOptions()} className="select-sm" {...otherProps} />;
};

export default CardStatusDropdown;

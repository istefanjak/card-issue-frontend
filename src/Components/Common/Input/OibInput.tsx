import { FC } from 'react';
import * as Yup from 'yup';
import Input from 'Components/Common/Input/Generic/Input';
import { UseFormReturn } from 'react-hook-form';

export const OibInputSchema = Yup.string()
  .required('OIB is required')
  .matches(/^\d+$/, 'Must be only digits')
  .length(11, 'Must be exactly 11 digits long');

type OibInputProps = {
  className?: string;
  name: string;
  form: UseFormReturn<any>;
};

const OibInput: FC<OibInputProps> = (props) => {
  return <Input label="OIB" maxLength={11} {...props} />;
};

export default OibInput;

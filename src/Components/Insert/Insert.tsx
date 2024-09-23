import { FC, useState } from 'react';
import PageLayout from 'Components/Layout/PageLayout';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { AccountRequest } from 'Models/AccountRequest';
import OibInput, { OibInputSchema } from 'Components/Common/Input/OibInput';
import { postAccount } from 'Services/AccountService';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Input from 'Components/Common/Input/Generic/Input';
import SubmitButton from 'Components/Common/Buttons/SubmitButton';
import ResetButton from 'Components/Common/Buttons/ResetButton';

const Insert: FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const schema = Yup.object({
    oib: OibInputSchema,
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
  });

  type formType = Yup.InferType<typeof schema>;

  const form = useForm<formType>({
    resolver: yupResolver(schema),
  });

  const onFormSubmit: SubmitHandler<formType> = async (formData) => {
    setLoading(true);
    const request: AccountRequest = { ...formData };
    try {
      await postAccount(request);
      toast.success('Account created successfully');
      navigate(`/account/${formData.oib}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout title="Add new customer">
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="form-control flex gap-3">
        <OibInput name="oib" form={form} />
        <Input label="First name" name="firstName" form={form} />
        <Input label="Last name" name="lastName" form={form} />

        <div className="flex gap-3">
          <SubmitButton label="Add" loading={loading} />
          <ResetButton reset={form.reset} />
        </div>
      </form>
    </PageLayout>
  );
};

export default Insert;

import { FC, useState } from 'react';
import PageLayout from 'Components/Layout/PageLayout';
import OibInput, { OibInputSchema } from 'Components/Common/Input/OibInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ResetButton from 'Components/Common/Buttons/ResetButton';
import SubmitButton from 'Components/Common/Buttons/SubmitButton';
import { getAccount } from 'Services/AccountService';
import { useNavigate } from 'react-router-dom';

const Search: FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const schema = Yup.object({
    oib: OibInputSchema,
  });

  type formType = Yup.InferType<typeof schema>;

  const form = useForm<formType>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<formType> = async (formData) => {
    try {
      setLoading(true);
      const response = await getAccount(formData.oib);
      navigate(`/account/${formData.oib}`, { state: response });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout title="Search customers">
      <form onSubmit={form.handleSubmit(onSubmit)} className="form-control flex items-center gap-3">
        <OibInput form={form} name="oib" />
        <div className="flex gap-3">
          <SubmitButton label="Search" loading={loading} />
          <ResetButton reset={form.reset} />
        </div>
      </form>
    </PageLayout>
  );
};

export default Search;

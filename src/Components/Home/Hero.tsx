import { FC } from 'react';
import { CreditCard } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';

const Hero: FC = () => {
  const navigate = useNavigate();

  const title = 'Card issuing app';
  const description = 'This is a demo app for issuing credit cards to customers.';
  const buttonText = 'Search customers';

  const onButtonClick = () => {
    navigate('/search');
  };

  return (
    <div className="hero py-10">
      <div className="hero-content gap-10 flex-col lg:flex-row">
        <CreditCard size={128} />
        <div>
          <h1 className="text-5xl font-bold">{title}</h1>
          <p className="py-6">{description}</p>
          <button className="btn btn-primary" onClick={onButtonClick}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;

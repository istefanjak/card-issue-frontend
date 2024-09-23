import { FC, useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AccountResponse, AccountResponseCard } from 'Models/AccountResponse';
import { getAccount as _getAccount } from 'Services/AccountService';
import Loading from 'Components/Common/Loading';
import LoadingError from 'Components/Common/LoadingError';
import AccountDataDisplay from 'Components/Account/AccountDataDisplay';
import PageLayout from 'Components/Layout/PageLayout';
import AccountCreditCardDisplay from 'Components/Account/AccountCreditCardDisplay';

const Account: FC = () => {
  const { oib } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [accountResponse, setAccountResponse] = useState<AccountResponse | undefined | null>();

  const getAccount = useCallback(async () => {
    if (!oib) {
      navigate('/');
      return;
    }

    try {
      setAccountResponse(undefined);
      const response = await _getAccount(oib);
      setAccountResponse(response);
    } catch (e) {
      setAccountResponse(null);
    }
  }, [navigate, oib]);

  useEffect(() => {
    if (!oib) {
      navigate('/');
      return;
    }

    if (state) {
      setAccountResponse(state);
    } else {
      void getAccount();
    }
  }, [getAccount, navigate, oib, state]);

  const onCardRemoved = (cardId: number) => {
    setAccountResponse((prev) => {
      if (!prev) {
        void getAccount();
        return prev;
      }

      return { ...prev, cards: prev.cards.filter((card) => card.id !== cardId) };
    });
  };

  const onCardAdded = (card: AccountResponseCard) => {
    setAccountResponse((prev) => {
      if (!prev) {
        void getAccount();
        return prev;
      }

      return { ...prev, cards: [...prev.cards, card] };
    });
  };

  const onCardEdited = (card: AccountResponseCard) => {
    setAccountResponse((prev) => {
      if (!prev) {
        void getAccount();
        return prev;
      }

      return {
        ...prev,
        cards: prev.cards.map((prevCard) => (prevCard.id === card.id ? card : prevCard)),
      };
    });
  };

  if (accountResponse === undefined) {
    return <Loading />;
  }

  if (accountResponse === null) {
    return <LoadingError />;
  }

  return (
    <PageLayout title="Customer info">
      <AccountDataDisplay
        data={{
          OIB: accountResponse.oib,
          'First name': accountResponse.firstName,
          'Last name': accountResponse.lastName,
        }}
      />
      <AccountCreditCardDisplay
        oib={accountResponse.oib}
        cards={accountResponse.cards}
        onCardRemoved={onCardRemoved}
        onCardAdded={onCardAdded}
        onCardEdited={onCardEdited}
      />
    </PageLayout>
  );
};

export default Account;

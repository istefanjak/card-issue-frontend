import { FC, Fragment, useEffect, useState } from 'react';
import { AccountResponseCard } from 'Models/AccountResponse';
import EditButton from 'Components/Account/Buttons/EditButton';
import RemoveButton from 'Components/Account/Buttons/RemoveButton';
import AddButton from 'Components/Account/Buttons/AddButton';
import SaveButton from 'Components/Account/Buttons/SaveButton';
import CancelButton from 'Components/Account/Buttons/CancelButton';
import { CardStatus } from 'Models/CardStatus';
import { getConstants as _getConstants } from 'Services/ConstantsService';
import CardStatusDropdown, {
  CardStatusDropdownSchema,
} from 'Components/Common/Input/CardStatusDropdown';
import * as Yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { deleteCard, postCard, putCard } from 'Services/CardService';
import toast from 'react-hot-toast';
import { CardRequest } from 'Models/CardRequest';

enum Mode {
  READ,
  EDIT,
}

type AccountCreditCardDisplayProps = {
  oib: string;
  cards: AccountResponseCard[];
  onCardRemoved?: (cardId: number) => void;
  onCardAdded?: (card: AccountResponseCard) => void;
  onCardEdited?: (card: AccountResponseCard) => void;
};

const AccountCreditCardDisplay: FC<AccountCreditCardDisplayProps> = ({
  oib,
  cards,
  onCardRemoved,
  onCardAdded,
  onCardEdited,
}) => {
  const [mode, setMode] = useState<Mode>(Mode.READ);
  const [cardEditId, setCardEditId] = useState<number>();
  const [cardStatuses, setCardStatuses] = useState<CardStatus[]>([]);

  const schema = Yup.object({
    cardStatus: CardStatusDropdownSchema,
  });

  type formType = Yup.InferType<typeof schema>;

  const form = useForm<formType>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const getConstants = async () => {
      const response = await _getConstants();
      setCardStatuses(response.cardStatus);
    };

    void getConstants();
  }, []);

  const getCardStatus = (card: AccountResponseCard) => {
    switch (mode) {
      case Mode.READ:
        return card.status;
      case Mode.EDIT:
        if (cardEditId !== card.id) {
          return card.status;
        }
        return (
          <CardStatusDropdown
            key={card.id}
            statuses={cardStatuses}
            initialSelection={card.status}
            name="cardStatus"
            form={form}
          />
        );
    }
  };

  const onEditClick = (cardId: number) => {
    setMode(Mode.EDIT);
    setCardEditId(cardId);
  };

  const onRemoveClick = async (cardId: number) => {
    await deleteCard(cardId);
    onCardRemoved?.(cardId);
    toast.success('Card removed successfully.');
  };

  const onAddClick = async () => {
    const cardStatus: CardStatus = 'PENDING';
    const request: CardRequest = {
      oib,
      cardStatus,
    };
    const newCardId = await postCard(request);
    onCardAdded?.({ id: newCardId, status: cardStatus });
    toast.success('Card added successfully.');
  };

  const onCancelClick = () => {
    setMode(Mode.READ);
  };

  const onEditSubmit: SubmitHandler<formType> = async (formData) => {
    if (!cardEditId) {
      console.error('cardEditId is undefined');
      return;
    }

    const status = formData.cardStatus;
    await putCard(cardEditId, { cardStatus: status });
    setMode(Mode.READ);
    onCardEdited?.({id: cardEditId, status });
    toast.success('Card changed successfully.');
  };

  return (
    <form onSubmit={form.handleSubmit(onEditSubmit)} className="card bg-base-100 shadow-xl w-96">
      <div className="card-body">
        <div className="card-title pb-5">Credit cards</div>
        {(!cards.length && (
          <div>There are no credit cards. Click on add to add a new credit card.</div>
        )) || (
          <div className={'grid gap-3 ' + (mode === Mode.READ ? 'grid-cols-3' : 'grid-cols-2')}>
            <div className="badge badge-outline">ID</div>
            <div className="badge badge-outline">Status</div>
            {mode === Mode.READ && <div className="badge badge-outline">Action</div>}

            {cards.map((card) => (
              <Fragment key={card.id}>
                <div className="pl-3 font-bold">{card.id}</div>
                <div>{getCardStatus(card)}</div>
                {mode === Mode.READ && (
                  <div className="flex gap-1">
                    <EditButton onClick={() => onEditClick(card.id)} />
                    <RemoveButton onClick={() => onRemoveClick(card.id)} />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        )}
      </div>

      <div className="p-2 flex justify-end">
        {mode === Mode.READ && <AddButton onClick={onAddClick} />}
        {mode === Mode.EDIT && (
          <>
            <SaveButton />
            <CancelButton onClick={onCancelClick} />
          </>
        )}
      </div>
    </form>
  );
};

export default AccountCreditCardDisplay;

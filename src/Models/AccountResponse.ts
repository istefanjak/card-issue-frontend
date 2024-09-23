import { CardStatus } from 'Models/CardStatus';

export type AccountResponse = {
  oib: string;
  firstName: string;
  lastName: string;
  cards: AccountResponseCard[];
};

export type AccountResponseCard = {
  id: number;
  status: CardStatus;
};

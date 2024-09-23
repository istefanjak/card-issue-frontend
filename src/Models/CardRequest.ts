import { CardStatus } from 'Models/CardStatus';

export type CardRequest = {
  oib: string;
  cardStatus: CardStatus;
};

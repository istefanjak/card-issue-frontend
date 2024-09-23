import api from 'AxiosInstance';
import { CardRequest } from 'Models/CardRequest';
import { CardChangeRequest } from 'Models/CardChangeRequest';

export async function postCard(request: CardRequest) {
  const res = await api.post<number>('/card', request);
  return res.data;
}

export async function deleteCard(id: number) {
  const res = await api.delete<void>(`/card/${id}`);
  return res.data;
}

export async function putCard(id: number, request: CardChangeRequest) {
  const res = await api.put<void>(`/card/${id}`, request);
  return res.data;
}
import api from 'AxiosInstance';
import { AccountResponse } from 'Models/AccountResponse';
import { AccountRequest } from 'Models/AccountRequest';

export async function getAccount(oib: string) {
  const res = await api.get<AccountResponse>(`/account/${oib}`);
  return res.data;
}

export async function postAccount(request: AccountRequest) {
  const res = await api.post<number>('/account', request);
  return res.data;
}

export async function deleteAccount(oib: string) {
  const res = await api.delete<void>(`/account/${oib}`);
  return res.data;
}

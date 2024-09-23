import api from 'AxiosInstance';
import { ConstantsResponse } from 'Models/ConstantsResponse';

export async function getConstants() {
  const res = await api.get<ConstantsResponse>(`/const`);
  return res.data;
}

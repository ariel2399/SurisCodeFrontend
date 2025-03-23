import api from './axios';

export interface Haircut {
  id: number;
  name: string;
  price: number;
}

export const getHaircuts = async (): Promise<Haircut[]> => {
  const response = await api.get<Haircut[]>('/haircuts');
  return response.data;
};

import {instance} from './baseURL';

export interface pokeSetObj {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalities: {
    unlimited: string;
  };
  ptcgoCode: string;
  releaseDate: string;
  updatedAt: string;
  images: {
    symbol: string;
    logo: string;
  };
}

export type PokemonSet = pokeSetObj[];

export const pokeSetApi = async () => {
  try {
    const response = await instance.get('sets');
    if (response.status == 200) {
      return response.data.data as PokemonSet;
    }
  } catch (error) {
    throw error;
  }
};

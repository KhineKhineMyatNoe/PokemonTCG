import {instance} from './baseURL';

export type PokemonTypes = string[];

export const pokeTypeApi = async () => {
  try {
    const response = await instance.get('types');
    if (response.status == 200) {
      return response.data.data as PokemonTypes;
    }
  } catch (error) {
    throw error;
  }
};

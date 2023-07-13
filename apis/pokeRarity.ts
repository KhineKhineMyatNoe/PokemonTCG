import {instance} from './baseURL';

export type PokemonRarity = string[];

export const pokeRarityApi = async () => {
  try {
    const response = await instance.get('rarities');
    if (response.status == 200) {
      return response.data.data as PokemonRarity;
    }
  } catch (error) {
    throw error;
  }
};

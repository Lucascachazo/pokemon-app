import { create, isAxiosError } from 'axios';
import type {
  PokemonDetails,
  PokemonSummary,
} from '../../domain/models/pokemon';
import type { PokemonRepository } from '../../domain/repositories/pokemon-repository';
import type {
  PokemonListItem,
  PokemonListResponse,
  PokemonDetailsResponse,
} from './api-repository-types';

const pokeApi = create({
  baseURL: 'https://pokeapi.co/api/v2',
  timeout: 10000,
});

const PAGE_SIZE = 10;
const NAME_INDEX_SIZE = 10000;

const getRequestError = (error: unknown): Error => {
  if (!isAxiosError(error)) {
    return error instanceof Error
      ? error
      : new Error('Ocurrió un error inesperado al consultar PokeAPI.');
  }

  return new Error(
    error.response
      ? `PokeAPI respondió con el estado ${error.response.status}.`
      : 'No se pudo conectar con PokeAPI.',
    { cause: error },
  );
};

const getData = async <T>(
  path: string,
  params?: { limit: number; offset: number },
): Promise<T> => {
  try {
    const response = await pokeApi.get<T>(path, { params });
    return response.data;
  } catch (error) {
    throw getRequestError(error);
  }
};

const getPokemonId = (url: string): number =>
  Number(url.split('/').filter(Boolean).pop());

const toPokemonSummary = ({ name, url }: PokemonListItem): PokemonSummary => {
  const id = getPokemonId(url);

  return {
    id,
    name,
    imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
  };
};

const mapPokemonDetailsResponse = (
  data: PokemonDetailsResponse,
): PokemonDetails => ({
  id: data.id,
  name: data.name,
  imageUrl:
    data.sprites.other?.['official-artwork']?.front_default ??
    data.sprites.front_default ??
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
  height: data.height,
  weight: data.weight,
  types: data.types.map(({ type }) => type.name),
  abilities: data.abilities.map(({ ability, is_hidden }) => ({
    name: ability.name,
    isHidden: is_hidden,
  })),
  stats: data.stats.map(({ stat, base_stat }) => ({
    name: stat.name,
    baseStat: base_stat,
  })),
});

export const pokeApiPokemonRepository: PokemonRepository = {
  loadPage: async (offset) => {
    const { results, next } = await getData<PokemonListResponse>('/pokemon', {
      limit: PAGE_SIZE,
      offset,
    });

    return {
      items: results.map(toPokemonSummary),
      nextOffset: next ? offset + results.length : null,
    };
  },

  loadDetails: async (pokemonId) => {
    const response = await getData<PokemonDetailsResponse>(
      `/pokemon/${pokemonId}`,
    );

    return mapPokemonDetailsResponse(response);
  },

  loadNameIndex: async () => {
    const { results } = await getData<PokemonListResponse>('/pokemon', {
      limit: NAME_INDEX_SIZE,
      offset: 0,
    });

    return results.map(({ name, url }) => ({
      id: getPokemonId(url),
      name,
    }));
  },
};

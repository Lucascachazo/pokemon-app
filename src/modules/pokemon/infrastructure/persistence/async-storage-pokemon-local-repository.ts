import AsyncStorage from '@react-native-async-storage/async-storage';
import type { PokemonLocalRepository } from '../../domain/repositories/pokemon-local-repository';
import type {
  CachedPokemonList,
  PokemonDetails,
  PokemonSummary,
} from '../../domain/models/pokemon';

const FAVORITES_KEY = '@pokedex/favorites';
const LAST_LIST_KEY = '@pokedex/last-loaded-list';

const saveLoadedList = async (
  pokemon: PokemonSummary[],
  nextOffset: number | null,
): Promise<void> => {
  const cachedList: CachedPokemonList = {
    items: [...pokemon],
    nextOffset,
  };

  await writeValue(LAST_LIST_KEY, cachedList);
};

const writeValue = async <T>(key: string, value: T): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    throw new Error(`No se pudo guardar la información (${key}).`, {
      cause: error,
    });
  }
};

const readValue = async <T>(key: string, fallback: T): Promise<T> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value === null ? fallback : (JSON.parse(value) as T);
  } catch (error) {
    throw new Error(`No se pudo leer la información guardada (${key}).`, {
      cause: error,
    });
  }
};

const removeFavorite = async (pokemonId: number): Promise<void> => {
  const favorites = await readValue<PokemonDetails[]>(FAVORITES_KEY, []);
  const updated = favorites.filter((favorite) => favorite.id !== pokemonId);
  await writeValue(FAVORITES_KEY, updated);
};

const saveFavorite = async (pokemon: PokemonDetails): Promise<void> => {
  const favorites = await readValue<PokemonDetails[]>(FAVORITES_KEY, []);
  const updated = [
    ...favorites.filter((favorite) => favorite.id !== pokemon.id),
    pokemon,
  ];

  await writeValue(FAVORITES_KEY, updated);
};

export const asyncStoragePokemonLocalRepository: PokemonLocalRepository = {
  loadLastList: () => readValue<CachedPokemonList | null>(LAST_LIST_KEY, null),
  saveLoadedList,
  loadFavorites: () => readValue<PokemonDetails[]>(FAVORITES_KEY, []),
  saveFavorite,
  removeFavorite,
};

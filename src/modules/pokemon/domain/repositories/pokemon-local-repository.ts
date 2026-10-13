import type {
  CachedPokemonList,
  PokemonDetails,
  PokemonSummary,
} from '../models/pokemon';

export interface PokemonLocalRepository {
  loadLastList: () => Promise<CachedPokemonList | null>;
  saveLoadedList: (
    pokemon: PokemonSummary[],
    nextOffset: number | null,
  ) => Promise<void>;
  loadFavorites: () => Promise<PokemonDetails[]>;
  saveFavorite: (pokemon: PokemonDetails) => Promise<void>;
  removeFavorite: (pokemonId: number) => Promise<void>;
}

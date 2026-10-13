import type { PokemonLocalRepository } from '../repositories/pokemon-local-repository';
import type {
  CachedPokemonList,
  PokemonDetails,
  PokemonSummary,
} from '../models/pokemon';

export const createPokemonLocalUseCases = (
  repository: PokemonLocalRepository,
) => {
  return {
    loadLastList: (): Promise<CachedPokemonList | null> => {
      return repository.loadLastList();
    },
    saveLoadedList: (
      pokemon: PokemonSummary[],
      nextOffset: number | null,
    ): Promise<void> => {
      return repository.saveLoadedList(pokemon, nextOffset);
    },
    loadFavorites: (): Promise<PokemonDetails[]> => {
      return repository.loadFavorites();
    },
    saveFavorite: (pokemon: PokemonDetails): Promise<void> => {
      return repository.saveFavorite(pokemon);
    },
    removeFavorite: (pokemonId: number): Promise<void> => {
      return repository.removeFavorite(pokemonId);
    },
  };
};

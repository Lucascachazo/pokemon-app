import type { PokemonRepository } from '../repositories/pokemon-repository';

export const createPokemonUseCases = (repository: PokemonRepository) => ({
  loadPage: (offset: number) => repository.loadPage(offset),
  loadDetails: (pokemonId: number) => repository.loadDetails(pokemonId),
  loadNameIndex: () => repository.loadNameIndex(),
});

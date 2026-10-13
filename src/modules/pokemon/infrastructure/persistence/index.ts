import { createPokemonLocalUseCases } from '../../domain/use-cases/pokemon-local-use-cases';
import { asyncStoragePokemonLocalRepository } from './async-storage-pokemon-local-repository';

export const pokemonLocalUseCases = createPokemonLocalUseCases(
  asyncStoragePokemonLocalRepository,
);

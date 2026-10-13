import type { PokemonName } from '../../domain/models/pokemon';
import { createPokemonUseCases } from '../../domain/use-cases/pokemon-use-cases';
import { pokeApiPokemonRepository } from './poke-api-pokemon-repository';

const pokemonUseCases = createPokemonUseCases(pokeApiPokemonRepository);
let pokemonNameIndexRequest: Promise<PokemonName[]> | null = null;

export const loadPokemonDetails = pokemonUseCases.loadDetails;
export const loadPokemonPage = pokemonUseCases.loadPage;
export const loadPokemonNameIndex = () => {
  if (pokemonNameIndexRequest) return pokemonNameIndexRequest;

  pokemonNameIndexRequest = pokemonUseCases
    .loadNameIndex()
    .catch((error: unknown) => {
      pokemonNameIndexRequest = null;
      throw error;
    });

  return pokemonNameIndexRequest;
};

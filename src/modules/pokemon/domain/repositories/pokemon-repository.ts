import type {
  PokemonDetails,
  PokemonName,
  PokemonPage,
} from '../models/pokemon';

export interface PokemonRepository {
  loadPage: (offset: number) => Promise<PokemonPage>;
  loadDetails: (pokemonId: number) => Promise<PokemonDetails>;
  loadNameIndex: () => Promise<PokemonName[]>;
}

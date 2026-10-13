import type { PokemonName } from '../models/pokemon';

export const searchPokemonByName = (
  pokemon: PokemonName[],
  query: string,
): PokemonName[] => {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return [];
  }

  return pokemon.filter((item) =>
    item.name.toLowerCase().includes(normalizedQuery),
  );
};

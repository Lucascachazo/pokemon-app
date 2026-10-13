export type PokemonListItem = { name: string; url: string };

export type PokemonListResponse = {
  next: string | null;
  results: PokemonListItem[];
};
export type PokemonDetailsResponse = {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
    other?: { 'official-artwork'?: { front_default: string | null } };
  };
  types: { type: { name: string } }[];
  abilities: { is_hidden: boolean; ability: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
};

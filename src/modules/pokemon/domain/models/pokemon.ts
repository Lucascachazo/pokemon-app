export interface PokemonSummary {
  id: number;
  name: string;
  imageUrl: string;
  types?: string[];
}

export interface PokemonName {
  id: number;
  name: string;
}

export interface PokemonAbility {
  name: string;
  isHidden: boolean;
}

export interface PokemonStat {
  name: string;
  baseStat: number;
}

export interface PokemonDetails extends PokemonSummary {
  height: number;
  weight: number;
  types: string[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
}

export interface CachedPokemonList {
  items: PokemonSummary[];
  nextOffset: number | null;
}

export interface PokemonPage {
  items: PokemonSummary[];
  nextOffset: number | null;
}

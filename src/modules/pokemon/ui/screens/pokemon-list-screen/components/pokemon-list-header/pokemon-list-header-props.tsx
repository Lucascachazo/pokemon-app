export interface PokemonListHeaderProps {
  query: string;
  resultCount: number | null;
  isOffline: boolean;
  hasPokemon: boolean;
  errorMessage: string;
  onQueryChange: (query: string) => void;
  onRetryList: () => void;
}

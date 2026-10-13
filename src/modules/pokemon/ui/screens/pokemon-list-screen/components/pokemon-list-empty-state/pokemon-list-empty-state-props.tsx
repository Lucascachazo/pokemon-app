export interface PokemonListEmptyStateProps {
  isSearching: boolean;
  isSearchLoading: boolean;
  searchErrorMessage: string;
  isLoading: boolean;
  onRetrySearch: () => void;
  onRetryList: () => void;
}

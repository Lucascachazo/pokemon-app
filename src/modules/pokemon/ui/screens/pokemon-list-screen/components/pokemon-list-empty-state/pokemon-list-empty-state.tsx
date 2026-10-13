import { TouchableOpacity, Text, View } from 'react-native';
import { styles } from './pokemon-list-empty-state.styles';
import { PokemonListEmptyStateProps } from './pokemon-list-empty-state-props';
import { SkeletonCards } from './skeletons';

export const PokemonListEmptyState = ({
  isSearching,
  isSearchLoading,
  searchErrorMessage,
  isLoading,
  onRetrySearch,
  onRetryList,
}: PokemonListEmptyStateProps) => {
  if (isSearching && isSearchLoading) {
    return <SkeletonCards />;
  }

  if (isSearching && searchErrorMessage) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>{searchErrorMessage}</Text>
        <TouchableOpacity onPress={onRetrySearch} style={styles.retryButton}>
          <Text style={styles.retryText}>Reintentar búsqueda</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (isLoading) {
    return <SkeletonCards />;
  }

  if (isSearching) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>
          No encontramos Pokémon con ese nombre
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyTitle}>No hay Pokémon para mostrar</Text>
      <TouchableOpacity onPress={onRetryList} style={styles.retryButton}>
        <Text style={styles.retryText}>Reintentar</Text>
      </TouchableOpacity>
    </View>
  );
};

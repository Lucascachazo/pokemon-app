import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRef, useState } from 'react';
import type { RootStackParamList } from '../../../../../navigation/types';
import { PokemonCard } from '../../components/pokemon-card/pokemon-card';
import { usePokemonSearch } from '../../hooks/use-pokemon-search';
import { usePokemonList } from '../../hooks/use-pokemon-list';
import { PokemonListEmptyState } from './components/pokemon-list-empty-state/pokemon-list-empty-state';
import { PokemonListHeader } from './components/pokemon-list-header/pokemon-list-header';
import { styles } from './pokemon-list-screen.styles';

type ListNavigation = NativeStackNavigationProp<RootStackParamList>;

export const PokemonListScreen = () => {
  const navigation = useNavigation<ListNavigation>();
  const [query, setQuery] = useState('');
  const canLoadMore = useRef(false);
  const {
    pokemon,
    isLoading,
    isLoadingMore,
    isOffline,
    errorMessage,
    loadMore,
    retry,
  } = usePokemonList();
  const search = usePokemonSearch(query);
  const isSearching = query.trim().length > 0;
  const visiblePokemon = isSearching ? search.pokemon : pokemon;
  const loadNextPage = () => {
    if (!canLoadMore.current) return;

    canLoadMore.current = false;
    loadMore();
  };

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <FlatList
        style={styles.list}
        data={visiblePokemon}
        numColumns={2}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.listRow}
        onScrollBeginDrag={() => {
          canLoadMore.current = true;
        }}
        onEndReached={isSearching ? undefined : loadNextPage}
        onEndReachedThreshold={0.1}
        ListHeaderComponent={
          <PokemonListHeader
            query={query}
            resultCount={search.resultCount}
            isOffline={isOffline}
            hasPokemon={pokemon.length > 0}
            errorMessage={errorMessage}
            onQueryChange={setQuery}
            onRetryList={retry}
          />
        }
        renderItem={({ item }) => (
          <PokemonCard.Root>
            <PokemonCard.Body
              name={item.name}
              onPress={() =>
                navigation.navigate('PokemonDetail', {
                  pokemonId: item.id,
                  name: item.name,
                })
              }
            >
              <PokemonCard.Image uri={item.imageUrl} />
              <PokemonCard.Info id={item.id} name={item.name} />
            </PokemonCard.Body>
          </PokemonCard.Root>
        )}
        ListEmptyComponent={
          <PokemonListEmptyState
            isSearching={isSearching}
            isSearchLoading={search.isLoading}
            searchErrorMessage={search.errorMessage}
            isLoading={isLoading}
            onRetrySearch={search.retry}
            onRetryList={retry}
          />
        }
      />

      {!isSearching && isLoadingMore && (
        <View pointerEvents="none" style={styles.loadingMore}>
          <ActivityIndicator color="#e94560" size="small" />
          <Text style={styles.loadingMoreText}>Cargando más Pokémon...</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RootStackParamList } from '../../../../../navigation/types';
import { useFavorites } from '../../hooks/use-favorites';
import { PokemonCard } from '../../components/pokemon-card/pokemon-card';
import { styles } from './favorites-screen.styles';

type FavoritesNavigation = NativeStackNavigationProp<RootStackParamList>;

export const FavoritesScreen = () => {
  const navigation = useNavigation<FavoritesNavigation>();
  const { favorites, isLoading, removeFavorite, retry, errorMessage } =
    useFavorites();

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <FlatList
        data={favorites}
        numColumns={2}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.listRow}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.eyebrow}>TU EQUIPO POKÉMON</Text>
            <View style={styles.titleRow}>
              <MaterialDesignIcons name="heart" size={29} color="#E94560" />
              <Text style={styles.title}>Favoritos</Text>
            </View>
            {favorites.length > 0 && (
              <Text style={styles.subtitle}>
                Guardados en este dispositivo · {favorites.length}
              </Text>
            )}

            {!!errorMessage && favorites.length > 0 && (
              <TouchableOpacity onPress={retry} style={styles.errorBanner}>
                <Text style={styles.errorText}>
                  {errorMessage} · Toca para reintentar
                </Text>
              </TouchableOpacity>
            )}
          </View>
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
              <PokemonCard.Info id={item.id} name={item.name} />
              <PokemonCard.Image uri={item.imageUrl} />
              <PokemonCard.Type value={item.types?.[0]} />
            </PokemonCard.Body>
            <PokemonCard.RemoveButton
              name={item.name}
              onPress={() => removeFavorite(item.id)}
            />
          </PokemonCard.Root>
        )}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator
              color="#e94560"
              size="large"
              style={styles.emptyState}
            />
          ) : errorMessage ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>{errorMessage}</Text>
              <TouchableOpacity onPress={retry} style={styles.retryButton}>
                <Text style={styles.retryText}>Reintentar</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>Todavía no tienes favoritos</Text>
              <Text style={styles.emptyText}>
                Guarda un Pokémon desde su detalle para verlo aquí, incluso sin
                conexión.
              </Text>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
};

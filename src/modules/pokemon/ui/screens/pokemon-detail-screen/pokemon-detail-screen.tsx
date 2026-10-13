import {
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { usePokemonDetails } from '../../hooks/use-pokemon-details';
import {
  PokemonAbilities,
  PokemonDetailHeader,
  PokemonMeasurements,
  PokemonStats,
} from './pokemon-detail-content';
import { styles } from './pokemon-detail-screen.styles';
import { Props } from './pokemon-detail-header-props';

export const PokemonDetailScreen = ({ route }: Props) => {
  const {
    pokemon,
    isFavorite,
    isLoading,
    isSavingFavorite,
    isOffline,
    errorMessage,
    toggleFavorite,
    retry,
  } = usePokemonDetails(route.params.pokemonId);

  if (!pokemon && isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color="#e94560" size="large" />
        <Text style={styles.loadingText}>Cargando Pokémon...</Text>
      </View>
    );
  }

  if (!pokemon) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{errorMessage}</Text>
        <TouchableOpacity onPress={retry} style={styles.retryButton}>
          <Text style={styles.favoriteButtonText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <PokemonDetailHeader
        pokemon={pokemon}
        isFavorite={isFavorite}
        isSavingFavorite={isSavingFavorite}
        onToggleFavorite={toggleFavorite}
      />
      {isOffline && (
        <View style={styles.offlineBanner}>
          <Text style={styles.offlineText}>
            Sin conexión. Se muestran los datos guardados de este favorito.
          </Text>
        </View>
      )}
      <PokemonMeasurements height={pokemon.height} weight={pokemon.weight} />
      <PokemonAbilities abilities={pokemon.abilities} />
      <PokemonStats stats={pokemon.stats} />
    </ScrollView>
  );
};

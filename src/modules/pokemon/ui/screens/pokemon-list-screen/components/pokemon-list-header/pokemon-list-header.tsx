import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import { TouchableOpacity, Text, TextInput, View } from 'react-native';
import { styles } from './pokemon-list-header.styles';
import { PokemonListHeaderProps } from './pokemon-list-header-props';

export const PokemonListHeader = ({
  query,
  resultCount,
  isOffline,
  hasPokemon,
  errorMessage,
  onQueryChange,
  onRetryList,
}: PokemonListHeaderProps) => {
  const isSearching = query.trim().length > 0;

  return (
    <View style={styles.header}>
      <Text style={styles.eyebrow}>POKÉMON · COLECCIÓN</Text>
      <View style={styles.titleRow}>
        <MaterialDesignIcons name="pokeball" size={30} color="#E94560" />
        <Text style={styles.title}>Pokédex</Text>
      </View>
      <Text style={styles.subtitle}>Tu próxima aventura empieza aquí</Text>
      <View style={styles.searchBox}>
        <MaterialDesignIcons name="magnify" size={21} color="#8c91a0" />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={onQueryChange}
          placeholder="Buscar Pokémon..."
          placeholderTextColor="#8c91a0"
          style={styles.searchInput}
          value={query}
        />
        {!!query && (
          <TouchableOpacity
            accessibilityRole="button"
            hitSlop={8}
            onPress={() => onQueryChange('')}
          >
            <MaterialDesignIcons
              name="close-circle"
              size={20}
              color="#8c91a0"
            />
          </TouchableOpacity>
        )}
      </View>
      {isOffline && !isSearching && hasPokemon && (
        <View style={styles.offlineBanner}>
          <Text style={styles.offlineText}>
            Sin conexión. Mostrando la última lista guardada.
          </Text>
        </View>
      )}
      {!isSearching && !!errorMessage && (
        <TouchableOpacity onPress={onRetryList} style={styles.errorBanner}>
          <Text style={styles.errorText}>
            {errorMessage} · Toca para reintentar
          </Text>
        </TouchableOpacity>
      )}
      {resultCount !== null && (
        <Text style={styles.resultCount}>
          {resultCount} {resultCount === 1 ? 'resultado' : 'resultados'}
        </Text>
      )}
    </View>
  );
};

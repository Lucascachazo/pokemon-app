import { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import type {
  PokemonAbility,
  PokemonStat,
} from '../../../domain/models/pokemon';
import { styles } from './pokemon-detail-screen.styles';
import {
  PokemonDetailHeaderProps,
  PokemonMeasurementsProps,
} from './pokemon-detail-header-props';

export const PokemonDetailHeader = ({
  pokemon,
  isFavorite,
  isSavingFavorite,
  onToggleFavorite,
}: PokemonDetailHeaderProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <View style={styles.hero}>
      <Text style={styles.name}>{pokemon.name}</Text>
      <View style={styles.imageContainer}>
        {!imageLoaded && <View style={styles.imagePlaceholder} />}
        <Image
          source={{ uri: pokemon.imageUrl }}
          onLoad={() => setImageLoaded(true)}
          style={[styles.image, !imageLoaded && styles.hiddenImage]}
        />
      </View>
      <View style={styles.types}>
        {pokemon.types.map((type) => (
          <View key={type} style={styles.type}>
            <Text style={styles.typeName}>{type}</Text>
          </View>
        ))}
      </View>
      <Pressable
        accessibilityState={{
          checked: isFavorite,
          disabled: isSavingFavorite,
        }}
        disabled={isSavingFavorite}
        onPress={onToggleFavorite}
        style={({ pressed }) => [
          styles.favoriteButton,
          isFavorite && styles.favoriteButtonActive,
          pressed && styles.favoriteButtonPressed,
        ]}
      >
        <Text
          style={[
            styles.favoriteButtonText,
            isFavorite && styles.favoriteButtonTextActive,
          ]}
        >
          {isSavingFavorite
            ? 'Guardando...'
            : isFavorite
              ? 'Quitar de favoritos'
              : 'Agregar a favoritos'}
        </Text>
      </Pressable>
    </View>
  );
};

export const PokemonMeasurements = ({
  height,
  weight,
}: PokemonMeasurementsProps) => (
  <View style={styles.measurements}>
    <View style={styles.measurement}>
      <Text style={styles.measurementValue}>{height} m</Text>
      <Text style={styles.measurementLabel}>Altura</Text>
    </View>
    <View style={styles.measurementDivider} />
    <View style={styles.measurement}>
      <Text style={styles.measurementValue}>{weight} kg</Text>
      <Text style={styles.measurementLabel}>Peso</Text>
    </View>
  </View>
);

export const PokemonAbilities = ({
  abilities,
}: {
  abilities: PokemonAbility[];
}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Habilidades</Text>
    {abilities.map((ability) => (
      <View key={ability.name} style={styles.ability}>
        <Text style={styles.abilityName}>{ability.name}</Text>
        {ability.isHidden && <Text style={styles.hiddenAbility}>Oculta</Text>}
      </View>
    ))}
  </View>
);

export const PokemonStats = ({ stats }: { stats: PokemonStat[] }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Estadísticas</Text>
    {stats.map((stat) => (
      <View key={stat.name} style={styles.stat}>
        <View style={styles.statHeader}>
          <Text style={styles.statName}>{stat.name}</Text>
          <Text style={styles.statValue}>{stat.baseStat}</Text>
        </View>
        <View style={styles.statBar}>
          <View
            style={[
              styles.statFill,
              { width: `${Math.min((stat.baseStat / 255) * 100, 100)}%` },
            ]}
          />
        </View>
      </View>
    ))}
  </View>
);

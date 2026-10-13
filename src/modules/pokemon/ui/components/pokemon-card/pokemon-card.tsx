import { useState, type ReactNode } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './pokemon-card.styles';

const Root = ({ children }: { children: ReactNode }) => (
  <View style={styles.card}>{children}</View>
);

const Body = ({
  onPress,
  children,
}: {
  name: string;
  onPress: () => void;
  children: ReactNode;
}) => (
  <TouchableOpacity
    accessibilityRole="button"
    onPress={onPress}
    activeOpacity={0.78}
    style={styles.body}
  >
    {children}
  </TouchableOpacity>
);

const PokemonImage = ({ uri }: { uri: string }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <View style={styles.imageContainer}>
      {!imageLoaded && <View style={styles.imagePlaceholder} />}
      <Image
        source={{ uri }}
        onLoad={() => setImageLoaded(true)}
        style={[styles.image, !imageLoaded && styles.hiddenImage]}
      />
    </View>
  );
};

const Info = ({ id, name }: { id: number; name: string }) => (
  <>
    <Text style={styles.pokemonId}>#{id}</Text>
    <Text numberOfLines={1} style={styles.pokemonName}>
      {name}
    </Text>
  </>
);

const Type = ({ value }: { value?: string }) => {
  if (!value) return null;

  return (
    <View style={styles.typeBadge}>
      <Text style={styles.typeName}>{value}</Text>
    </View>
  );
};

const RemoveButton = ({
  name,
  onPress,
}: {
  name: string;
  onPress: () => void;
}) => (
  <TouchableOpacity
    accessibilityRole="button"
    onPress={onPress}
    style={styles.removeButton}
  >
    <Text style={styles.removeText}>Quitar</Text>
  </TouchableOpacity>
);

export const PokemonCard = {
  Root,
  Body,
  Image: PokemonImage,
  Info,
  Type,
  RemoveButton,
};

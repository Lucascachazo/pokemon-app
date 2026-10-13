import { View } from 'react-native';
import { styles } from './pokemon-list-empty-state.styles';

export const SkeletonCards = () => (
  <View style={styles.loadingGrid}>
    {[1, 2, 3, 4, 5, 6].map((_, index) => (
      <View key={index} style={styles.skeletonCard}>
        <View style={styles.skeletonImage} />
        <View style={styles.skeletonText} />
      </View>
    ))}
  </View>
);

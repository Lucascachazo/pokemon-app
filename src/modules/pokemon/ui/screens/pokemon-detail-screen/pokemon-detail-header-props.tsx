import type { PokemonDetails } from '../../../domain/models/pokemon';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../../../navigation/types';

export interface PokemonDetailHeaderProps {
  pokemon: PokemonDetails;
  isFavorite: boolean;
  isSavingFavorite: boolean;
  onToggleFavorite: () => void;
}

export interface PokemonMeasurementsProps {
  height: number;
  weight: number;
}

export type Props = NativeStackScreenProps<RootStackParamList, 'PokemonDetail'>;

import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import type { PokemonDetails } from '../../domain/models/pokemon';
import { pokemonLocalUseCases } from '../../infrastructure/persistence';
import { getErrorMessage } from '../utils/get-error-message';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<PokemonDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const loadFavorites = useCallback(async () => {
    try {
      const savedFavorites = await pokemonLocalUseCases.loadFavorites();
      setFavorites(savedFavorites);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(
        getErrorMessage(error, 'No se pudieron cargar los favoritos.'),
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [loadFavorites]),
  );

  const removeFavorite = useCallback(async (pokemonId: number) => {
    try {
      await pokemonLocalUseCases.removeFavorite(pokemonId);
      setFavorites((current) =>
        current.filter((pokemon) => pokemon.id !== pokemonId),
      );
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(
        getErrorMessage(error, 'No se pudieron cargar los favoritos.'),
      );
    }
  }, []);

  const retry = useCallback(() => {
    setIsLoading(true);
    loadFavorites();
  }, [loadFavorites]);

  return {
    favorites,
    isLoading,
    errorMessage,
    removeFavorite,
    retry,
  };
};

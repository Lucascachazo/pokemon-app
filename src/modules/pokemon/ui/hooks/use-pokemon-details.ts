import { useEffect, useState } from 'react';
import type { PokemonDetails } from '../../domain/models/pokemon';
import { loadPokemonDetails } from '../../infrastructure/api';
import { pokemonLocalUseCases } from '../../infrastructure/persistence';
import { getErrorMessage } from '../utils/get-error-message';

export const usePokemonDetails = (pokemonId: number) => {
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingFavorite, setIsSavingFavorite] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let isActive = true;

    const loadDetails = async () => {
      setIsLoading(true);
      setErrorMessage('');
      let savedFavorite: PokemonDetails | undefined;
      let storageError = '';

      try {
        const favorites = await pokemonLocalUseCases.loadFavorites();
        savedFavorite = favorites.find((favorite) => favorite.id === pokemonId);

        if (isActive && savedFavorite) {
          setPokemon(savedFavorite);
          setIsFavorite(true);
        }
      } catch (error) {
        storageError = getErrorMessage(error);
      }

      try {
        const details = await loadPokemonDetails(pokemonId);

        if (isActive) {
          setPokemon(details);
          setIsOffline(false);
          setErrorMessage(storageError);
        }
      } catch (error) {
        if (isActive) {
          setIsOffline(true);
          setErrorMessage(
            savedFavorite
              ? 'Sin conexión. Mostrando los datos guardados de este favorito.'
              : getErrorMessage(error),
          );
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    loadDetails();

    return () => {
      isActive = false;
    };
  }, [pokemonId, retryCount]);

  const toggleFavorite = async () => {
    if (!pokemon || isSavingFavorite) {
      return;
    }

    setIsSavingFavorite(true);
    setErrorMessage('');

    try {
      if (isFavorite) {
        await pokemonLocalUseCases.removeFavorite(pokemonId);
        setIsFavorite(false);
      } else {
        await pokemonLocalUseCases.saveFavorite(pokemon);
        setIsFavorite(true);
      }
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsSavingFavorite(false);
    }
  };

  const retry = () => {
    setRetryCount((count) => count + 1);
  };

  return {
    pokemon,
    isFavorite,
    isLoading,
    isSavingFavorite,
    isOffline,
    errorMessage,
    toggleFavorite,
    retry,
  };
};

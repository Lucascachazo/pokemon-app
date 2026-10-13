import { useCallback, useEffect, useRef, useState } from 'react';
import type { PokemonSummary } from '../../domain/models/pokemon';
import { loadPokemonPage } from '../../infrastructure/api';
import { pokemonLocalUseCases } from '../../infrastructure/persistence';
import { getErrorMessage } from '../utils/get-error-message';

export const usePokemonList = () => {
  const [pokemon, setPokemon] = useState<PokemonSummary[]>([]);
  const [nextOffset, setNextOffset] = useState<number | null>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const isFetching = useRef(false);

  const loadPage = useCallback(
    async (offset: number, currentPokemon: PokemonSummary[]) => {
      if (isFetching.current) return;

      isFetching.current = true;
      setErrorMessage('');
      const isInitialLoad = currentPokemon.length === 0;
      setIsLoading(isInitialLoad);
      setIsLoadingMore(!isInitialLoad);

      try {
        const page = await loadPokemonPage(offset);
        const updatedPokemon = [...currentPokemon, ...page.items];

        setPokemon(updatedPokemon);
        setNextOffset(page.nextOffset);
        setIsOffline(false);

        try {
          await pokemonLocalUseCases.saveLoadedList(
            updatedPokemon,
            page.nextOffset,
          );
        } catch (error) {
          setErrorMessage(
            getErrorMessage(
              error,
              'Ocurrió un error inesperado al cargar Pokémon.',
            ),
          );
        }
      } catch (error) {
        setIsOffline(true);
        setErrorMessage(
          getErrorMessage(
            error,
            'Ocurrió un error inesperado al cargar Pokémon.',
          ),
        );
      } finally {
        isFetching.current = false;
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    [],
  );

  useEffect(() => {
    let isActive = true;

    const restoreList = async () => {
      try {
        const cachedList = await pokemonLocalUseCases.loadLastList();
        if (!isActive) return;

        if (cachedList) {
          setPokemon(cachedList.items);
          setNextOffset(cachedList.nextOffset);
          setIsLoading(false);
          return;
        }
      } catch (error) {
        if (!isActive) return;
        setErrorMessage(getErrorMessage(error));
      }

      if (isActive) {
        await loadPage(0, []);
      }
    };

    restoreList();

    return () => {
      isActive = false;
    };
  }, [loadPage]);

  const loadMore = useCallback(() => {
    if (nextOffset === null || isLoading || isLoadingMore || errorMessage) {
      return;
    }

    loadPage(nextOffset, pokemon);
  }, [errorMessage, isLoading, isLoadingMore, loadPage, nextOffset, pokemon]);

  const retry = useCallback(() => {
    const offset = nextOffset ?? 0;
    loadPage(offset, pokemon);
  }, [loadPage, nextOffset, pokemon]);

  return {
    pokemon,
    isLoading,
    isLoadingMore,
    isOffline,
    errorMessage,
    loadMore,
    retry,
  };
};

import { useEffect, useState } from 'react';
import type { PokemonName, PokemonSummary } from '../../domain/models/pokemon';
import { searchPokemonByName } from '../../domain/use-cases/search-pokemon-by-name';
import { loadPokemonNameIndex } from '../../infrastructure/api';
import { getErrorMessage } from '../utils/get-error-message';

const toPokemonSummary = ({ id, name }: PokemonName): PokemonSummary => ({
  id,
  name,
  imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
});

export const usePokemonSearch = (query: string) => {
  const normalizedQuery = query.trim().toLowerCase();
  const [pokemon, setPokemon] = useState<PokemonSummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    if (!normalizedQuery) {
      setPokemon([]);
      setErrorMessage('');
      setIsLoading(false);
      return;
    }

    let isCurrentSearch = true;
    setIsLoading(true);
    setErrorMessage('');

    const searchPokemon = async () => {
      try {
        //TODO: Solo lo DEjo para que se vea el skeleton..
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const index = await loadPokemonNameIndex();

        if (isCurrentSearch) {
          setPokemon(
            searchPokemonByName(index, normalizedQuery).map(toPokemonSummary),
          );
        }
      } catch (error: unknown) {
        if (isCurrentSearch) {
          setPokemon([]);
          setErrorMessage(
            getErrorMessage(error, 'No se pudo cargar el índice de Pokémon.'),
          );
        }
      } finally {
        if (isCurrentSearch) setIsLoading(false);
      }
    };

    searchPokemon();

    return () => {
      isCurrentSearch = false;
    };
  }, [normalizedQuery, retryKey]);

  return {
    pokemon,
    isLoading,
    errorMessage,
    resultCount:
      normalizedQuery && !isLoading && !errorMessage ? pokemon.length : null,
    retry: () => setRetryKey((key) => key + 1),
  };
};

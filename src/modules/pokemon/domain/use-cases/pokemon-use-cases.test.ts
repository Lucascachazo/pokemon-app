import type { PokemonPage } from '../models/pokemon';
import type { PokemonRepository } from '../repositories/pokemon-repository';
import { createPokemonUseCases } from './pokemon-use-cases';

it('loads a Pokémon page through the repository', async () => {
  const page: PokemonPage = { items: [], nextOffset: null };
  const repository: jest.Mocked<PokemonRepository> = {
    loadPage: jest.fn().mockResolvedValue(page),
    loadDetails: jest.fn(),
    loadNameIndex: jest.fn(),
  };
  const useCases = createPokemonUseCases(repository);

  await expect(useCases.loadPage(0)).resolves.toEqual(page);
  expect(repository.loadPage).toHaveBeenCalledWith(0);
});

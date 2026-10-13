import { fireEvent, render } from '@testing-library/react-native';
import { PokemonListEmptyState } from './pokemon-list-empty-state';

it('shows the empty list message and retries when pressed', () => {
  const onRetryList = jest.fn();
  const screen = render(
    <PokemonListEmptyState
      isSearching={false}
      isSearchLoading={false}
      searchErrorMessage=""
      isLoading={false}
      onRetrySearch={jest.fn()}
      onRetryList={onRetryList}
    />,
  );

  expect(screen.getByText('No hay Pokémon para mostrar')).toBeTruthy();
  fireEvent.press(screen.getByText('Reintentar'));
  expect(onRetryList).toHaveBeenCalled();
});

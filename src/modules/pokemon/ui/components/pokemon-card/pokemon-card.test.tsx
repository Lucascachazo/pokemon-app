import { fireEvent, render } from '@testing-library/react-native';
import { PokemonCard } from './pokemon-card';

it('shows the Pokémon and opens its details when pressed', () => {
  const onPress = jest.fn();
  const screen = render(
    <PokemonCard.Root>
      <PokemonCard.Body name="bulbasaur" onPress={onPress}>
        <PokemonCard.Info id={1} name="bulbasaur" />
      </PokemonCard.Body>
      <PokemonCard.Type value="grass" />
    </PokemonCard.Root>,
  );

  expect(screen.getByText('bulbasaur')).toBeTruthy();
  expect(screen.getByText('grass')).toBeTruthy();
  fireEvent.press(screen.getByRole('button', { name: 'Ver bulbasaur' }));
  expect(onPress).toHaveBeenCalled();
});

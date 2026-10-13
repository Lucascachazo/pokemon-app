export type MainTabParamList = {
  Pokedex: undefined;
  Favorites: undefined;
  Pepito: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  PokemonDetail: {
    pokemonId: number;
    name: string;
  };
};

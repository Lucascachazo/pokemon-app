import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialDesignIcons } from '@react-native-vector-icons/material-design-icons';
import type { MainTabParamList } from './types';
import { FavoritesScreen } from '../modules/pokemon/ui/screens/favorites-screen/favorites-screen';
import { PokemonListScreen } from '../modules/pokemon/ui/screens/pokemon-list-screen/pokemon-list-screen';
import { styles } from './styles';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#e94560',
        tabBarInactiveTintColor: '#8c91a0',
        tabBarShowLabel: true,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tab.Screen
        name="Pokedex"
        component={PokemonListScreen}
        options={{
          title: 'Pokédex',
          tabBarLabel: 'Pokédex',
          tabBarIcon: ({ color, size }) => (
            <MaterialDesignIcons name="pokeball" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: 'Favoritos',
          tabBarLabel: 'Favoritos',
          tabBarIcon: ({ color, size }) => (
            <MaterialDesignIcons name="heart" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';

import { colors, spacing } from '../theme';
import type { MainTabParamList } from '../types';
import { HomeStackNavigator } from './HomeStackNavigator';
import { ProfileDrawerNavigator } from './ProfileDrawerNavigator';
import { CartScreen } from '../screens/CartScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { useAppState } from '../state/AppStateContext';

const Tab = createBottomTabNavigator<MainTabParamList>();

function getHomeTabBarStyle(route: RouteProp<MainTabParamList, 'Home'>) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeList';
  if (routeName === 'RestaurantDetail' || routeName === 'Cart') {
    return { display: 'none' as const };
  }

  return {
    backgroundColor: colors.tabBar,
    borderTopColor: colors.border,
    height: 68,
    paddingBottom: spacing.sm,
    paddingTop: spacing.sm,
  };
}

export function MainTabsNavigator() {
  const { cartCount } = useAppState();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: { fontWeight: '600' },
        tabBarStyle: {
          backgroundColor: colors.tabBar,
          borderTopColor: colors.border,
          height: 68,
          paddingBottom: spacing.sm,
          paddingTop: spacing.sm,
        },
        tabBarIcon: ({ color, size }) => {
          const iconMap: Record<string, keyof typeof MaterialCommunityIcons.glyphMap> = {
            Home: 'home-variant',
            Search: 'magnify',
            Cart: 'cart-outline',
            Profile: 'account-circle-outline',
          };

          return <MaterialCommunityIcons name={iconMap[route.name]} color={color} size={size} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={({ route }) => ({
          title: 'Home',
          tabBarStyle: getHomeTabBarStyle(route),
        })}
      />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarBadge: cartCount > 0 ? cartCount : undefined,
        }}
      />
      <Tab.Screen name="Profile" component={ProfileDrawerNavigator} />
    </Tab.Navigator>
  );
}

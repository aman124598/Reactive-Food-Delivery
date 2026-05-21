import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { colors } from '../theme';
import type { HomeStackParamList } from '../types';
import { CartScreen } from '../screens/CartScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { RestaurantDetailScreen } from '../screens/RestaurantDetailScreen';
import { DeliveryTrackingScreen } from '../screens/DeliveryTrackingScreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '700' },
        headerBackTitle: 'Home',
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="HomeList" component={HomeScreen} options={{ title: '' }} />
      <Stack.Screen
        name="RestaurantDetail"
        component={RestaurantDetailScreen}
        options={({ route }) => ({ title: route.params.restaurantName ?? 'Restaurant Detail' })}
      />
      <Stack.Screen name="DeliveryTracking" component={DeliveryTrackingScreen} options={{ title: 'Tracking' }} />
      <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Cart' }} />
    </Stack.Navigator>
  );
}

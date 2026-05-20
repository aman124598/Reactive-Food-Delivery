import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { colors } from '../theme';
import type { AuthStackParamList } from '../types';
import { useAppState } from '../state/AppStateContext';
import { LoginScreen } from '../screens/LoginScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthStackNavigator() {
  const { hasCompletedOnboarding } = useAppState();

  return (
    <Stack.Navigator
      initialRouteName={hasCompletedOnboarding ? 'Login' : 'Onboarding'}
      screenOptions={{
        headerShown: false,
        animation: 'fade_from_bottom',
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

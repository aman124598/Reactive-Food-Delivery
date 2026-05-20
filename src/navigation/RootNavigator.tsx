import { CommonActions, NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { colors } from '../theme';
import type { RootStackParamList } from '../types';
import { AuthStackNavigator } from './AuthStackNavigator';
import { MainTabsNavigator } from './MainTabsNavigator';
import { useAppState } from '../state/AppStateContext';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { hydrated, isAuthenticated, pendingDeepLink, clearPendingDeepLink } = useAppState();
  const navigationRef = useNavigationContainerRef<RootStackParamList>();
  const [ready, setReady] = React.useState(false);
  const previousAuth = useRef<boolean | null>(null);

  useEffect(() => {
    if (!hydrated || !ready) return;

    if (previousAuth.current !== isAuthenticated) {
      navigationRef.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: isAuthenticated ? 'Main' : 'Auth' }],
        }),
      );
      previousAuth.current = isAuthenticated;
    }
  }, [hydrated, isAuthenticated, navigationRef, ready]);

  useEffect(() => {
    if (!hydrated || !ready || !isAuthenticated || !pendingDeepLink) return;

    const timer = setTimeout(() => {
      navigationRef.navigate('Main', {
        screen: 'Home',
        params: {
          screen: 'RestaurantDetail',
          params: {
            restaurantId: pendingDeepLink.restaurantId,
          },
        },
      });
      clearPendingDeepLink();
    }, 0);

    return () => clearTimeout(timer);
  }, [clearPendingDeepLink, hydrated, isAuthenticated, navigationRef, pendingDeepLink, ready]);

  if (!hydrated) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingTitle}>Loading FoodApp</Text>
        <Text style={styles.loadingSubtitle}>Preparing your delivery experience...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer ref={navigationRef} onReady={() => setReady(true)}>
      <RootStack.Navigator
        initialRouteName={isAuthenticated ? 'Main' : 'Auth'}
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <RootStack.Screen name="Auth" component={AuthStackNavigator} />
        <RootStack.Screen name="Main" component={MainTabsNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 24,
  },
  loadingTitle: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
  },
  loadingSubtitle: {
    marginTop: 8,
    color: colors.muted,
    textAlign: 'center',
  },
});

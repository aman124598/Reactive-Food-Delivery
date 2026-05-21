import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from 'expo-linking';
import Constants from 'expo-constants';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { restaurants } from '../data/restaurants';
import type { AuthUser, CartItem, Restaurant, RestaurantDeepLink } from '../types';

type AppStateContextValue = {
  hydrated: boolean;
  hasCompletedOnboarding: boolean;
  isAuthenticated: boolean;
  user: AuthUser | null;
  cart: CartItem[];
  cartCount: number;
  pendingDeepLink: RestaurantDeepLink | null;
  completeOnboarding: () => void;
  signIn: (input?: { name?: string; email?: string }) => void;
  signOut: () => void;
  addToCart: (restaurant: Restaurant) => void;
  decrementFromCart: (restaurantId: string) => void;
  removeFromCart: (restaurantId: string) => void;
  clearCart: () => void;
  setPendingDeepLink: (value: RestaurantDeepLink | null) => void;
  clearPendingDeepLink: () => void;
};

const AUTH_KEY = 'foodapp:auth';
const CART_KEY = 'foodapp:cart';
const ONBOARDING_KEY = 'foodapp:onboarding';

const DEFAULT_USER: AuthUser = {
  name: 'Aman',
  email: 'aman@foodapp.dev',
  avatar: 'https://i.pravatar.cc/300?img=12',
};

const AppStateContext = createContext<AppStateContextValue | undefined>(undefined);

function parseDeepLink(url: string | null): RestaurantDeepLink | null {
  if (!url) return null;

  const parsed = Linking.parse(url);
  const segments = [parsed.hostname, parsed.path]
    .filter(Boolean)
    .join('/')
    .replace(/^\/+/, '')
    .split('/');

  if (segments[0] === 'restaurant' && segments[1]) {
    return { restaurantId: segments[1] };
  }

  return null;
}

function upsertCartItem(cart: CartItem[], restaurant: Restaurant): CartItem[] {
  const existing = cart.find((item) => item.id === restaurant.id);

  if (!existing) {
    return [...cart, { ...restaurant, quantity: 1, addedAt: Date.now() }];
  }

  return cart.map((item) =>
    item.id === restaurant.id ? { ...item, quantity: item.quantity + 1 } : item,
  );
}

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [pendingDeepLink, setPendingDeepLink] = useState<RestaurantDeepLink | null>(null);

  useEffect(() => {
    let cancelled = false;

    const hydrate = async () => {
      // In development or when running from localhost (Expo debugger), avoid
      // persisting data between runs. This clears saved AsyncStorage keys so
      // the app starts fresh on each reload and the splash/onboarding shows.
      const isDebuggerLocalhost = typeof Constants.manifest?.debuggerHost === 'string' &&
        Constants.manifest.debuggerHost.includes('localhost');

      if (__DEV__ || isDebuggerLocalhost) {
        try {
          await AsyncStorage.multiRemove([AUTH_KEY, CART_KEY, ONBOARDING_KEY]);
        } catch {
          // ignore
        }
        setHydrated(true);
        return;
      }

      const [authJson, cartJson, onboardingJson] = await Promise.all([
        AsyncStorage.getItem(AUTH_KEY),
        AsyncStorage.getItem(CART_KEY),
        AsyncStorage.getItem(ONBOARDING_KEY),
      ]);

      if (cancelled) {
        return;
      }

      if (authJson) {
        const storedAuth = JSON.parse(authJson) as { isAuthenticated: boolean; user: AuthUser | null };
        setIsAuthenticated(Boolean(storedAuth.isAuthenticated));
        setUser(storedAuth.user ?? null);
      }

      if (cartJson) {
        setCart(JSON.parse(cartJson) as CartItem[]);
      }

      if (onboardingJson) {
        setHasCompletedOnboarding(onboardingJson === 'true');
      }

      setHydrated(true);
    };

    void hydrate();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (__DEV__) return; // skip persistence in development/localhost
    void AsyncStorage.setItem(
      AUTH_KEY,
      JSON.stringify({ isAuthenticated, user }),
    );
  }, [hydrated, isAuthenticated, user]);

  useEffect(() => {
    if (!hydrated) return;
    if (__DEV__) return; // skip persistence in development/localhost
    void AsyncStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    if (__DEV__) return; // skip persistence in development/localhost
    void AsyncStorage.setItem(ONBOARDING_KEY, hasCompletedOnboarding ? 'true' : 'false');
  }, [hasCompletedOnboarding, hydrated]);

  useEffect(() => {
    let subscription: { remove: () => void } | undefined;

    const handleUrl = (url: string | null) => {
      const deepLink = parseDeepLink(url);
      if (deepLink) {
        setPendingDeepLink(deepLink);
      }
    };

    void Linking.getInitialURL().then(handleUrl);
    subscription = Linking.addEventListener('url', (event) => handleUrl(event.url));

    return () => {
      subscription?.remove();
    };
  }, []);

  const value = useMemo<AppStateContextValue>(
    () => ({
      hydrated,
      hasCompletedOnboarding,
      isAuthenticated,
      user,
      cart,
      cartCount: cart.reduce((total, item) => total + item.quantity, 0),
      pendingDeepLink,
      completeOnboarding: () => setHasCompletedOnboarding(true),
      signIn: (input) => {
        setUser({
          ...DEFAULT_USER,
          name: input?.name?.trim() || DEFAULT_USER.name,
          email: input?.email?.trim() || DEFAULT_USER.email,
        });
        setIsAuthenticated(true);
      },
      signOut: () => {
        setIsAuthenticated(false);
        setUser(null);
        setCart([]);
        setPendingDeepLink(null);
      },
      addToCart: (restaurant) => {
        setCart((current) => upsertCartItem(current, restaurant));
      },
      decrementFromCart: (restaurantId) => {
        setCart((current) => {
          const existing = current.find((c) => c.id === restaurantId);
          if (!existing) return current;
          if (existing.quantity <= 1) return current.filter((c) => c.id !== restaurantId);
          return current.map((c) => (c.id === restaurantId ? { ...c, quantity: c.quantity - 1 } : c));
        });
      },
      removeFromCart: (restaurantId) => {
        setCart((current) => current.filter((item) => item.id !== restaurantId));
      },
      clearCart: () => setCart([]),
      setPendingDeepLink,
      clearPendingDeepLink: () => setPendingDeepLink(null),
    }),
    [cart, hasCompletedOnboarding, hydrated, isAuthenticated, pendingDeepLink, user],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within AppStateProvider');
  }

  return context;
}

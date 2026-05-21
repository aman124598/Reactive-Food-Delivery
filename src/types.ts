import type { NavigatorScreenParams } from '@react-navigation/native';

export type AuthUser = {
  name: string;
  email: string;
  avatar: string;
};

export type Restaurant = {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  eta: string;
  description: string;
  image: string;
};

export type CartItem = Restaurant & {
  quantity: number;
  addedAt: number;
};

export type RestaurantDeepLink = {
  restaurantId: string;
};

export type AuthStackParamList = {
  Onboarding: undefined;
  Login: undefined;
};

export type HomeStackParamList = {
  HomeList: undefined;
  RestaurantDetail: {
    restaurantId: string;
    restaurantName?: string;
    price?: number;
  };
  DeliveryTracking: { restaurantId?: string } | undefined;
  Cart: undefined;
};

export type ProfileDrawerParamList = {
  ProfileHome: undefined;
  MyOrders: undefined;
  Settings: undefined;
  Help: undefined;
};

export type MainTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Search: undefined;
  Cart: undefined;
  Profile: NavigatorScreenParams<ProfileDrawerParamList>;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
};

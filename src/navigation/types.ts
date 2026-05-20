import type { NavigatorScreenParams } from '@react-navigation/native';
import type {
  AuthStackParamList,
  HomeStackParamList,
  MainTabParamList,
  ProfileDrawerParamList,
  RootStackParamList,
} from '../types';

export type {
  AuthStackParamList,
  HomeStackParamList,
  MainTabParamList,
  ProfileDrawerParamList,
  RootStackParamList,
};

export type RootNavigatorProps = NavigatorScreenParams<RootStackParamList>;

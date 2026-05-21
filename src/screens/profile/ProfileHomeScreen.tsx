import type { DrawerScreenProps } from '@react-navigation/drawer';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useAppState } from '../../state/AppStateContext';
import { colors, spacing } from '../../theme';
import type { ProfileDrawerParamList } from '../../types';

type Props = DrawerScreenProps<ProfileDrawerParamList, 'ProfileHome'>;

export function ProfileHomeScreen({ navigation }: Props) {
  const { user } = useAppState();

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <Image source={{ uri: user?.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <Pressable style={styles.button} onPress={() => navigation.openDrawer()}>
        <Text style={styles.buttonText}>Open drawer</Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={() => navigation.navigate('MyOrders')}>
        <Text style={styles.secondaryButtonText}>View my orders</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 14,
    backgroundColor: colors.background,
  },
  hero: {
    alignItems: 'center',
    gap: 8,
    padding: 24,
    borderRadius: 28,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  email: {
    color: colors.muted,
  },
  card: {
    gap: 8,
    padding: 18,
    borderRadius: 22,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.text,
  },
  cardText: {
    color: colors.muted,
    lineHeight: 22,
  },
  button: {
    alignItems: 'center',
    borderRadius: 16,
    paddingVertical: 14,
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
  secondaryButton: {
    alignItems: 'center',
    borderRadius: 16,
    paddingVertical: 14,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryButtonText: {
    color: colors.text,
    fontWeight: '700',
  },
});

import type { DrawerScreenProps } from '@react-navigation/drawer';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../theme';
import type { ProfileDrawerParamList } from '../../types';

type Props = DrawerScreenProps<ProfileDrawerParamList, 'Help'>;

export function HelpScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Help</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>How does navigation work?</Text>
        <Text style={styles.cardText}>
          Onboarding leads to Login, Login switches to the main app, Home contains the nested restaurant stack, and Profile opens a drawer.
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Need support?</Text>
        <Text style={styles.cardText}>Use the mock help center, or wire this screen to real support channels later.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 12,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.text,
  },
  card: {
    padding: 18,
    borderRadius: 20,
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
    marginTop: 6,
    color: colors.muted,
    lineHeight: 22,
  },
});

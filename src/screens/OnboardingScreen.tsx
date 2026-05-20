import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { useAppState } from '../state/AppStateContext';
import { colors, spacing } from '../theme';
import type { AuthStackParamList } from '../types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Onboarding'>;

export function OnboardingScreen({ navigation }: Props) {
  const { completeOnboarding } = useAppState();

  const handleGetStarted = () => {
    completeOnboarding();
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.hero}>
        <View style={styles.badge}>
          <MaterialCommunityIcons name="truck-delivery-outline" size={22} color={colors.primary} />
          <Text style={styles.badgeText}>Fast delivery, warm food</Text>
        </View>
        <Text style={styles.title}>Food delivered with smoother navigation.</Text>
        <Text style={styles.subtitle}>
          Explore onboarding, auth, nested tabs, drawers, deep links, and animated transitions in one app.
        </Text>
      </View>

      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
        }}
        style={styles.image}
      />

      <Pressable style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 32,
    backgroundColor: colors.background,
    justifyContent: 'space-between',
  },
  hero: {
    gap: spacing.lg,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  badgeText: {
    color: colors.primary,
    fontWeight: '600',
  },
  title: {
    fontSize: 38,
    lineHeight: 44,
    fontWeight: '800',
    color: colors.text,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.muted,
  },
  image: {
    height: 320,
    borderRadius: 32,
    backgroundColor: colors.surfaceAlt,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    paddingVertical: 16,
    backgroundColor: colors.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
});

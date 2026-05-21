import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { useAppState } from '../state/AppStateContext';
import { colors, spacing } from '../theme';
import type { AuthStackParamList } from '../types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Onboarding'>;

export function OnboardingScreen({ navigation }: Props) {
  const { completeOnboarding } = useAppState();

  const handleSignup = () => {
    completeOnboarding();
    navigation.replace('Login');
  };

  const handleSignInNow = () => {
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topIllustrationWrap}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80' }}
          style={styles.illustration}
          resizeMode="cover"
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.heading}>Fresh from the kitchen to your doorstep</Text>

        <Pressable style={styles.primaryButton} onPress={handleSignup}>
          <Text style={styles.primaryButtonText}>Sign up with email</Text>
        </Pressable>

        <Pressable style={styles.googleButton} onPress={handleSignup}>
          <MaterialCommunityIcons name="google" size={18} color="#DB4437" />
          <Text style={styles.googleButtonText}>Sign up with Google</Text>
        </Pressable>

        <Pressable onPress={handleSignInNow} style={styles.signInRow}>
          <Text style={styles.smallText}>Already have an account? </Text>
          <Text style={styles.signInText}>Sign in now</Text>
        </Pressable>

        <Text style={styles.footerText}>By signing up, you agree to our Terms and Conditions.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topIllustrationWrap: {
    alignItems: 'center',
    paddingTop: 36,
    paddingHorizontal: 24,
  },
  illustration: {
    width: '86%',
    aspectRatio: 1,
    borderRadius: 28,
    backgroundColor: colors.surfaceAlt,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 36,
    gap: 12,
  },
  heading: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  primaryButton: {
    marginTop: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 16,
    backgroundColor: colors.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 3,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
  googleButton: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderRadius: 30,
    paddingVertical: 14,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.border,
  },
  googleButtonText: {
    color: colors.text,
    fontWeight: '700',
  },
  signInRow: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
  },
  smallText: {
    color: colors.muted,
  },
  signInText: {
    color: colors.primary,
    fontWeight: '700',
  },
  footerText: {
    marginTop: 18,
    color: colors.muted,
    fontSize: 12,
    textAlign: 'center',
  },
});

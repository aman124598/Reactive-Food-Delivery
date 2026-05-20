import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { restaurants } from '../data/restaurants';
import { useAppState } from '../state/AppStateContext';
import { colors, spacing } from '../theme';
import type { HomeStackParamList } from '../types';

type Props = NativeStackScreenProps<HomeStackParamList, 'RestaurantDetail'>;

export function RestaurantDetailScreen({ navigation, route }: Props) {
  const { addToCart } = useAppState();
  const restaurant =
    restaurants.find((item) => item.id === route.params.restaurantId) ?? restaurants[0];

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: restaurant.image }} style={styles.image} />
      <View style={styles.card}>
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.title}>{route.params.restaurantName ?? restaurant.name}</Text>
            <Text style={styles.meta}>{restaurant.category}</Text>
          </View>
          <View style={styles.badge}>
            <MaterialCommunityIcons name="star" size={16} color={colors.accent} />
            <Text style={styles.badgeText}>{restaurant.rating}</Text>
          </View>
        </View>

        <Text style={styles.description}>{restaurant.description}</Text>

        <View style={styles.infoRow}>
          <View style={styles.infoPill}>
            <Text style={styles.infoLabel}>Price</Text>
            <Text style={styles.infoValue}>${(route.params.price ?? restaurant.price).toFixed(2)}</Text>
          </View>
          <View style={styles.infoPill}>
            <Text style={styles.infoLabel}>ETA</Text>
            <Text style={styles.infoValue}>{restaurant.eta}</Text>
          </View>
        </View>

        <Pressable style={styles.primaryButton} onPress={() => addToCart(restaurant)}>
          <Text style={styles.primaryButtonText}>Add to cart</Text>
        </Pressable>

        <Pressable style={styles.secondaryButton} onPress={() => navigation.navigate('Cart')}>
          <Text style={styles.secondaryButtonText}>Go to cart</Text>
        </Pressable>

        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Go back</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 16,
    backgroundColor: colors.background,
  },
  image: {
    height: 260,
    borderRadius: 28,
    backgroundColor: colors.surfaceAlt,
  },
  card: {
    padding: 20,
    gap: 16,
    borderRadius: 28,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.text,
  },
  meta: {
    marginTop: 4,
    color: colors.muted,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: colors.surfaceAlt,
  },
  badgeText: {
    fontWeight: '700',
    color: colors.text,
  },
  description: {
    color: colors.text,
    lineHeight: 22,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 12,
  },
  infoPill: {
    flex: 1,
    borderRadius: 18,
    padding: 14,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoLabel: {
    color: colors.muted,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  infoValue: {
    marginTop: 6,
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  primaryButton: {
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  secondaryButton: {
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
  },
  secondaryButtonText: {
    color: colors.primaryDark,
    fontWeight: '700',
    fontSize: 16,
  },
  backButton: {
    alignItems: 'center',
    paddingVertical: 6,
  },
  backButtonText: {
    color: colors.muted,
    fontWeight: '700',
  },
});

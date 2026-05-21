import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { restaurants } from '../data/restaurants';
import RestaurantCard from '../components/RestaurantCard';
import { useAppState } from '../state/AppStateContext';
import { colors, spacing } from '../theme';
import type { HomeStackParamList } from '../types';

type Props = NativeStackScreenProps<HomeStackParamList, 'HomeList'>;

export function HomeScreen({ navigation }: Props) {
  const { addToCart, user } = useAppState();

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.topRow}>
        <View>
          <Text style={styles.locationLabel}>Nagoya, Japan</Text>
          <Pressable style={styles.locationRow} onPress={() => { }}>
            <MaterialCommunityIcons name="map-marker-radius" size={18} color={colors.primary} />
            <Text style={styles.locationText}>Nagoya,Japan</Text>
          </Pressable>
        </View>

        <Pressable onPress={() => navigation.getParent()?.navigate('Profile' as never)} style={styles.avatar}>
          {user?.avatar ? (
            <Image source={{ uri: user.avatar }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatarFallback} />
          )}
        </Pressable>
      </View>

      <Pressable style={styles.searchBox} onPress={() => navigation.getParent()?.navigate('Search' as never)}>
        <MaterialCommunityIcons name="magnify" size={22} color={colors.muted} />
        <Text style={styles.searchPlaceholder}>Try to search "spaghetti" or anything...</Text>
      </Pressable>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories} contentContainerStyle={{ gap: 12 }}>
        {['Recommended', 'Breakfast', 'Healthy', 'Pizza', 'Dessert'].map((c) => (
          <Pressable key={c} style={[styles.chip, c === 'Recommended' && styles.chipActive]}>
            <Text style={[styles.chipText, c === 'Recommended' && styles.chipTextActive]}>{c}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Recommended near you</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recommendedRow} contentContainerStyle={{ gap: 16 }}>
        {restaurants.slice(0, 4).map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            compact
            onPress={() => navigation.navigate('RestaurantDetail', { restaurantId: restaurant.id, restaurantName: restaurant.name, price: restaurant.price })}
          />
        ))}
      </ScrollView>

      {restaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          restaurant={restaurant}
          onPress={() => navigation.navigate('RestaurantDetail', { restaurantId: restaurant.id, restaurantName: restaurant.name, price: restaurant.price })}
        />
      ))}

      <Pressable style={styles.cartCta} onPress={() => navigation.navigate('Cart')}>
        <MaterialCommunityIcons name="cart-outline" size={20} color="#fff" />
        <Text style={styles.cartCtaText}>Go to cart</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 16,
    backgroundColor: colors.background,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  locationLabel: {
    color: colors.muted,
    fontSize: 12,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  locationText: {
    fontWeight: '700',
    color: colors.text,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: colors.surface,
  },
  avatarImage: {
    width: 42,
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatarFallback: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: colors.surfaceAlt,
  },
  searchBox: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 18,
    backgroundColor: colors.surface,
  },
  searchPlaceholder: {
    color: colors.muted,
    marginLeft: 4,
    flex: 1,
  },
  categories: {
    marginTop: 12,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: colors.surface,
  },
  chipActive: {
    backgroundColor: colors.primary,
  },
  chipText: {
    color: colors.text,
    fontWeight: '700',
  },
  chipTextActive: {
    color: '#fff',
  },
  sectionTitle: {
    marginTop: 18,
    fontWeight: '800',
    fontSize: 18,
    color: colors.text,
  },
  recommendedRow: {
    marginTop: 12,
  },
  smallCard: {
    width: 190,
    borderRadius: 18,
    backgroundColor: colors.surface,
    padding: 12,
  },
  smallImage: {
    height: 100,
    borderRadius: 12,
    backgroundColor: colors.surfaceAlt,
  },
  smallName: {
    marginTop: 8,
    fontWeight: '800',
    color: colors.text,
  },
  smallMetaRow: {
    marginTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  smallPrice: {
    color: colors.primary,
    fontWeight: '700',
  },
  smallRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  smallRatingText: {
    fontWeight: '700',
    color: colors.text,
  },
  headerCard: {
    gap: 8,
    padding: 20,
    borderRadius: 28,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  kicker: {
    color: colors.primary,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.7,
  },
  headerTitle: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '800',
    color: colors.text,
  },
  restaurantCard: {
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: {
    height: 180,
    backgroundColor: colors.surfaceAlt,
  },
  cardBody: {
    padding: 18,
    gap: 14,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  meta: {
    marginTop: 4,
    color: colors.muted,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: colors.surfaceAlt,
  },
  ratingText: {
    fontWeight: '700',
    color: colors.text,
  },
  description: {
    color: colors.text,
    lineHeight: 20,
  },
  price: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  secondaryButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  secondaryButtonText: {
    color: colors.text,
    fontWeight: '700',
  },
  primaryButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: colors.primary,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  cartCta: {
    marginTop: 4,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 18,
    paddingVertical: 14,
    backgroundColor: colors.primaryDark,
  },
  cartCtaText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

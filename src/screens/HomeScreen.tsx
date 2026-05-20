import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { restaurants } from '../data/restaurants';
import { useAppState } from '../state/AppStateContext';
import { colors, spacing } from '../theme';
import type { HomeStackParamList } from '../types';

type Props = NativeStackScreenProps<HomeStackParamList, 'HomeList'>;

export function HomeScreen({ navigation }: Props) {
  const { addToCart } = useAppState();

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerCard}>
        <Text style={styles.kicker}>Nearby restaurants</Text>
        <Text style={styles.headerTitle}>Find something delicious in a few taps.</Text>
      </View>

      {restaurants.map((restaurant) => (
        <Pressable
          key={restaurant.id}
          style={styles.restaurantCard}
          onPress={() =>
            navigation.navigate('RestaurantDetail', {
              restaurantId: restaurant.id,
              restaurantName: restaurant.name,
              price: restaurant.price,
            })
          }
        >
          <Image source={{ uri: restaurant.image }} style={styles.image} />
          <View style={styles.cardBody}>
            <View style={styles.rowBetween}>
              <View>
                <Text style={styles.restaurantName}>{restaurant.name}</Text>
                <Text style={styles.meta}>{restaurant.category}</Text>
              </View>
              <View style={styles.rating}>
                <MaterialCommunityIcons name="star" size={16} color={colors.accent} />
                <Text style={styles.ratingText}>{restaurant.rating}</Text>
              </View>
            </View>

            <Text style={styles.description} numberOfLines={2}>
              {restaurant.description}
            </Text>

            <View style={styles.rowBetween}>
              <View>
                <Text style={styles.price}>${restaurant.price.toFixed(2)}</Text>
                <Text style={styles.meta}>{restaurant.eta}</Text>
              </View>

              <View style={styles.actions}>
                <Pressable
                  style={styles.secondaryButton}
                  onPress={() =>
                    navigation.navigate('RestaurantDetail', {
                      restaurantId: restaurant.id,
                      restaurantName: restaurant.name,
                      price: restaurant.price,
                    })
                  }
                >
                  <Text style={styles.secondaryButtonText}>View</Text>
                </Pressable>
                <Pressable style={styles.primaryButton} onPress={() => addToCart(restaurant)}>
                  <Text style={styles.primaryButtonText}>Add</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Pressable>
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

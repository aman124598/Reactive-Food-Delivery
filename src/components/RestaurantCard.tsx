import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useAppState } from '../state/AppStateContext';

import { colors } from '../theme';
import type { Restaurant } from '../types';

type Props = {
  restaurant: Restaurant;
  onPress?: () => void;
  compact?: boolean;
};

export function RestaurantCard({ restaurant, onPress, compact }: Props) {
  const { cart, addToCart, decrementFromCart } = useAppState();
  const cartItem = cart.find((c) => c.id === restaurant.id);
  if (compact) {
    return (
      <Pressable style={styles.smallCard} onPress={onPress}>
        <Image source={{ uri: restaurant.image }} style={styles.smallImage} />
        <Text style={styles.smallName} numberOfLines={1}>{restaurant.name}</Text>
        <View style={styles.smallMetaRow}>
          <Text style={styles.smallPrice}>₹{restaurant.price.toLocaleString('en-IN')}</Text>
          <View style={styles.smallRating}>
            <MaterialCommunityIcons name="star" size={12} color={colors.accent} />
            <Text style={styles.smallRatingText}>{restaurant.rating}</Text>
          </View>
        </View>
        {cartItem ? (
          <View style={styles.compactControls}>
            <Pressable style={styles.qtyButton} onPress={() => decrementFromCart(restaurant.id)}>
              <Text style={styles.qtyButtonText}>−</Text>
            </Pressable>
            <Text style={styles.qtyLabel}>{cartItem.quantity}</Text>
            <Pressable style={styles.qtyButton} onPress={() => addToCart(restaurant)}>
              <Text style={styles.qtyButtonText}>+</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable style={styles.smallAdd} onPress={() => addToCart(restaurant)}>
            <Text style={styles.smallAddText}>Add</Text>
          </Pressable>
        )}
      </Pressable>
    );
  }

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={{ uri: restaurant.image }} style={styles.image} />
      <View style={styles.body}>
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.name}>{restaurant.name}</Text>
            <Text style={styles.meta}>{restaurant.category}</Text>
          </View>
          <View style={styles.ratingPill}>
            <MaterialCommunityIcons name="star" size={14} color={colors.accent} />
            <Text style={styles.ratingText}>{restaurant.rating}</Text>
          </View>
        </View>

        <Text style={styles.description} numberOfLines={2}>{restaurant.description}</Text>

        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.price}>₹{restaurant.price.toLocaleString('en-IN')}</Text>
            <Text style={styles.eta}>{restaurant.eta}</Text>
          </View>
          <View>
            {cartItem ? (
              <View style={styles.actionRow}>
                <Pressable style={styles.qtyButtonLarge} onPress={() => decrementFromCart(restaurant.id)}>
                  <Text style={styles.qtyButtonTextLarge}>−</Text>
                </Pressable>
                <Text style={styles.addedText}>{cartItem.quantity} added</Text>
                <Pressable style={styles.qtyButtonLarge} onPress={() => addToCart(restaurant)}>
                  <Text style={styles.qtyButtonTextLarge}>+</Text>
                </Pressable>
              </View>
            ) : (
              <Pressable style={styles.primaryAdd} onPress={() => addToCart(restaurant)}>
                <Text style={styles.primaryAddText}>Add</Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
  },
  image: {
    height: 160,
    backgroundColor: colors.surfaceAlt,
  },
  body: {
    padding: 14,
    gap: 8,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  meta: {
    marginTop: 4,
    color: colors.muted,
  },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
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
  eta: {
    color: colors.muted,
  },

  /* compact */
  smallCard: {
    width: 190,
    borderRadius: 16,
    backgroundColor: colors.surface,
    padding: 12,
  },
  smallImage: {
    height: 100,
    borderRadius: 10,
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
  compactControls: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  qtyButton: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  qtyLabel: {
    fontWeight: '800',
    marginHorizontal: 6,
  },
  smallAdd: {
    marginTop: 8,
    alignSelf: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: colors.primary,
  },
  smallAddText: {
    color: '#fff',
    fontWeight: '800',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  qtyButtonLarge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyButtonTextLarge: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },
  addedText: {
    fontWeight: '800',
    color: colors.text,
    marginHorizontal: 6,
  },
  primaryAdd: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: colors.primary,
  },
  primaryAddText: {
    color: '#fff',
    fontWeight: '800',
  },
});

export default RestaurantCard;

import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { useAppState } from '../state/AppStateContext';
import { colors, spacing } from '../theme';
import type { HomeStackParamList } from '../types';

type Props = NativeStackScreenProps<HomeStackParamList, 'Cart'>;

export function CartScreen({ navigation }: Props) {
  const { cart, clearCart, removeFromCart } = useAppState();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.summary}>
        <MaterialCommunityIcons name="cart-outline" size={28} color={colors.primary} />
        <Text style={styles.summaryTitle}>{cart.length ? 'Your cart is ready' : 'Your cart is empty'}</Text>
        <Text style={styles.summaryText}>
          {cart.length
            ? 'Review items, then reset back to Home after checkout.'
            : 'Add a restaurant from Home or Detail to fill the badge.'}
        </Text>
      </View>

      {cart.map((item) => (
        <View key={item.id} style={styles.itemCard}>
          <View style={styles.rowBetween}>
            <View style={{ flex: 1 }}>
              <Text style={styles.itemTitle}>{item.name}</Text>
              <Text style={styles.itemMeta}>
                {item.quantity} x ${item.price.toFixed(2)}
              </Text>
            </View>
            <Text style={styles.itemTotal}>${(item.price * item.quantity).toFixed(2)}</Text>
          </View>
          <Pressable style={styles.removeButton} onPress={() => removeFromCart(item.id)}>
            <Text style={styles.removeButtonText}>Remove</Text>
          </Pressable>
        </View>
      ))}

      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>Order total</Text>
        <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
      </View>

      <Pressable style={styles.primaryButton} onPress={() => navigation.reset({ index: 0, routes: [{ name: 'HomeList' }] })}>
        <Text style={styles.primaryButtonText}>Checkout and return Home</Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={() => navigation.goBack()}>
        <Text style={styles.secondaryButtonText}>Go back</Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={clearCart}>
        <Text style={styles.secondaryButtonText}>Clear cart</Text>
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
  summary: {
    gap: 8,
    padding: 20,
    borderRadius: 28,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  summaryTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  summaryText: {
    color: colors.muted,
    lineHeight: 22,
  },
  itemCard: {
    gap: 10,
    padding: 18,
    borderRadius: 24,
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
  itemTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.text,
  },
  itemMeta: {
    marginTop: 4,
    color: colors.muted,
  },
  itemTotal: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.primary,
  },
  removeButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: colors.surfaceAlt,
  },
  removeButtonText: {
    color: colors.primaryDark,
    fontWeight: '700',
  },
  totalCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    borderRadius: 24,
    backgroundColor: colors.primaryDark,
  },
  totalLabel: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  totalValue: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
  },
  primaryButton: {
    borderRadius: 18,
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
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryButtonText: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 16,
  },
});

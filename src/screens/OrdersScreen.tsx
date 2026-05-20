import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { restaurants } from '../data/restaurants';
import { useAppState } from '../state/AppStateContext';
import { colors } from '../theme';
import type { MainTabParamList } from '../types';

type Props = BottomTabScreenProps<MainTabParamList, 'Orders'>;

const recentOrders = restaurants.slice(0, 3);

export function OrdersScreen() {
  const { cartCount } = useAppState();

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <MaterialCommunityIcons name="receipt-text-outline" size={28} color={colors.primary} />
        <Text style={styles.title}>Orders</Text>
        <Text style={styles.subtitle}>
          The cart badge stays active while items are waiting to be checked out.
        </Text>
      </View>

      <View style={styles.metricCard}>
        <Text style={styles.metricLabel}>Items in cart</Text>
        <Text style={styles.metricValue}>{cartCount}</Text>
      </View>

      {recentOrders.map((order) => (
        <View key={order.id} style={styles.orderCard}>
          <Text style={styles.orderTitle}>{order.name}</Text>
          <Text style={styles.orderMeta}>
            {order.category} • ${order.price.toFixed(2)}
          </Text>
        </View>
      ))}
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
    gap: 8,
    padding: 20,
    borderRadius: 28,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.text,
  },
  subtitle: {
    color: colors.muted,
    lineHeight: 22,
  },
  metricCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    borderRadius: 22,
    backgroundColor: colors.primaryDark,
  },
  metricLabel: {
    color: '#fff',
    fontWeight: '700',
  },
  metricValue: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 24,
  },
  orderCard: {
    padding: 18,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  orderTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.text,
  },
  orderMeta: {
    marginTop: 4,
    color: colors.muted,
  },
});

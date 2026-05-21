import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { restaurants } from '../data/restaurants';
import { useAppState } from '../state/AppStateContext';
import { colors } from '../theme';
import RestaurantCard from '../components/RestaurantCard';
import type { MainTabParamList } from '../types';

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

      <Text style={styles.sectionTitle}>Recent orders</Text>
      <View style={{ gap: 12 }}>
        {recentOrders.map((order) => (
          <View key={order.id} style={styles.orderRow}>
            <RestaurantCard restaurant={order} onPress={() => { }} />
            <View style={styles.statusWrap}>
              <Text style={styles.status}>Delivered</Text>
              <Text style={styles.statusMeta}>{order.eta}</Text>
            </View>
          </View>
        ))}
      </View>
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
  orderRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  statusWrap: {
    marginLeft: 8,
    flex: 1,
    justifyContent: 'center',
  },
  status: {
    fontWeight: '800',
    color: colors.primary,
  },
  statusMeta: {
    marginTop: 6,
    color: colors.muted,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginTop: 12,
    marginBottom: 6,
  },
});

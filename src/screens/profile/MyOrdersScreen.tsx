import type { DrawerScreenProps } from '@react-navigation/drawer';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { restaurants } from '../../data/restaurants';
import { colors } from '../../theme';
import type { ProfileDrawerParamList } from '../../types';

type Props = DrawerScreenProps<ProfileDrawerParamList, 'MyOrders'>;

export function MyOrdersScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {restaurants.slice(0, 2).map((order) => (
        <View key={order.id} style={styles.card}>
          <Text style={styles.cardTitle}>{order.name}</Text>
          <Text style={styles.cardText}>
            Delivered • {order.category} • ₹{order.price.toLocaleString('en-IN')}
          </Text>
        </View>
      ))}
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
    marginTop: 4,
    color: colors.muted,
  },
});

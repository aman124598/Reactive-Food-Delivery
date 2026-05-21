import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { HomeStackParamList } from '../types';
import { colors } from '../theme';

type Props = NativeStackScreenProps<HomeStackParamList, 'DeliveryTracking'>;

export function DeliveryTrackingScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapText}>Map placeholder</Text>
      </View>

      <View style={styles.bottomSheet}>
        <Text style={styles.eta}>Your food will be arrived in 10 Minutes</Text>

        <View style={styles.driverRow}>
          <View style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <Text style={styles.driverName}>Billy Joe</Text>
            <Text style={styles.driverMeta}>Suzuki Giorno · JD 9283 EQ</Text>
          </View>
          <Pressable style={styles.callButton} onPress={() => { }}>
            <MaterialCommunityIcons name="phone" size={20} color="#fff" />
          </Pressable>
        </View>

        <View style={styles.deliveryDetails}>
          <Text style={styles.detailTitle}>Delivery details</Text>
          <Text style={styles.detailText}>Restaurant location: Starbucks coffee, Miyashita Park</Text>
          <Text style={styles.detailText}>Delivery location: Miyamoto 54 street, kanashimi prefecture</Text>
        </View>

        <Pressable style={styles.closeButton} onPress={() => navigation.goBack()}>
          <Text style={styles.closeText}>Close</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  mapPlaceholder: { flex: 1, backgroundColor: colors.surfaceAlt, alignItems: 'center', justifyContent: 'center' },
  mapText: { color: colors.muted },
  bottomSheet: { padding: 16, backgroundColor: colors.surface, borderTopLeftRadius: 18, borderTopRightRadius: 18 },
  eta: { fontWeight: '800', fontSize: 16, marginBottom: 12 },
  driverRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: colors.surfaceAlt },
  driverName: { fontWeight: '800' },
  driverMeta: { color: colors.muted, marginTop: 4 },
  callButton: { width: 44, height: 44, borderRadius: 999, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  deliveryDetails: { marginTop: 12 },
  detailTitle: { fontWeight: '800', marginBottom: 8 },
  detailText: { color: colors.muted, marginBottom: 6 },
  closeButton: { marginTop: 12, alignItems: 'center', paddingVertical: 10 },
  closeText: { color: colors.primary, fontWeight: '800' },
});

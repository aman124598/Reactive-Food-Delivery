import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { restaurants } from '../data/restaurants';
import { colors, spacing } from '../theme';
import RestaurantCard from '../components/RestaurantCard';
import type { MainTabParamList } from '../types';

type Props = BottomTabScreenProps<MainTabParamList, 'Search'>;

export function SearchScreen({ navigation }: Props) {
  const [query, setQuery] = useState('');
  const filtered = useMemo(
    () =>
      restaurants.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
          restaurant.category.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.searchBar}>
        <MaterialCommunityIcons name="magnify" size={20} color={colors.muted} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search restaurants or cuisines"
          placeholderTextColor={colors.muted}
          style={styles.searchInput}
        />
        {query.length > 0 && (
          <Pressable onPress={() => setQuery('')}>
            <MaterialCommunityIcons name="close" size={18} color={colors.muted} />
          </Pressable>
        )}
      </View>

      {query.trim() === '' ? (
        <View style={{ gap: 12 }}>
          <Text style={styles.sectionTitle}>Recent searches</Text>
          <View style={styles.rowCard}>
            <Text style={styles.rowTitle}>Pizza near me</Text>
          </View>
          <View style={styles.rowCard}>
            <Text style={styles.rowTitle}>Healthy bowls</Text>
          </View>
        </View>
      ) : (
        <View style={{ gap: 12 }}>
          {filtered.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              compact
              onPress={() =>
                navigation.navigate('Home', {
                  screen: 'RestaurantDetail',
                  params: { restaurantId: restaurant.id, restaurantName: restaurant.name, price: restaurant.price },
                })
              }
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 14,
    backgroundColor: colors.background,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 18,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    color: colors.text,
  },
  rowCard: {
    padding: 18,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  rowTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
  },
  rowMeta: {
    marginTop: 4,
    color: colors.muted,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 6,
  },
});

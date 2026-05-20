import { Switch, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

import { colors } from '../../theme';

export function SettingsScreen() {
  const [push, setPush] = useState(true);
  const [location, setLocation] = useState(true);

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Push notifications</Text>
        <Switch value={push} onValueChange={setPush} />
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Location access</Text>
        <Switch value={location} onValueChange={setLocation} />
      </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: {
    color: colors.text,
    fontWeight: '700',
  },
});

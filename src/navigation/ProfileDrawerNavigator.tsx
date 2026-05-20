import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Image, StyleSheet, Text, View } from 'react-native';

import { colors, spacing } from '../theme';
import type { ProfileDrawerParamList } from '../types';
import { useAppState } from '../state/AppStateContext';
import { HelpScreen } from '../screens/profile/HelpScreen';
import { MyOrdersScreen } from '../screens/profile/MyOrdersScreen';
import { ProfileHomeScreen } from '../screens/profile/ProfileHomeScreen';
import { SettingsScreen } from '../screens/profile/SettingsScreen';

const Drawer = createDrawerNavigator<ProfileDrawerParamList>();

function CustomDrawerContent(props: React.ComponentProps<typeof DrawerContentScrollView>) {
  const { user, signOut } = useAppState();

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
      <View style={styles.profileCard}>
        <Image source={{ uri: user?.avatar }} style={styles.avatar} />
        <Text style={styles.profileName}>{user?.name ?? 'Guest User'}</Text>
        <Text style={styles.profileEmail}>{user?.email ?? 'guest@foodapp.dev'}</Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() => {
          props.navigation.closeDrawer();
          signOut();
        }}
        icon={({ color, size }) => <MaterialCommunityIcons name="logout" color={color} size={size} />}
        labelStyle={{ color: colors.danger }}
      />
    </DrawerContentScrollView>
  );
}

export function ProfileDrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.text,
        drawerStyle: { backgroundColor: colors.background, width: 280 },
      }}
    >
      <Drawer.Screen
        name="ProfileHome"
        component={ProfileHomeScreen}
        options={{
          drawerItemStyle: { display: 'none' },
        }}
      />
      <Drawer.Screen
        name="MyOrders"
        component={MyOrdersScreen}
        options={{
          title: 'My Orders',
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="receipt-text-outline" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog-outline" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Help"
        component={HelpScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="help-circle-outline" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    paddingTop: spacing.xl,
  },
  profileCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.xl,
    padding: spacing.lg,
    borderRadius: 24,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginBottom: spacing.md,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  profileEmail: {
    marginTop: 4,
    color: colors.muted,
  },
});
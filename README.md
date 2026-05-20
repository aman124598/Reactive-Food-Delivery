# Reactive Food Delivery

Food delivery demo app built with Expo and React Native. The project is focused on React Navigation patterns: onboarding, conditional auth, nested stacks, tabs, drawer navigation, params, deep links, and state persistence.

## Navigation Structure

```mermaid
flowchart TD
  A[Onboarding] --> B[Login]
  B --> C[Main App]
  C --> D[Home Tab]
  C --> E[Search Tab]
  C --> F[Orders Tab]
  C --> G[Profile Tab]
  D --> H[Restaurant Detail]
  H --> I[Cart]
  G --> J[Drawer]
  J --> K[My Orders]
  J --> L[Settings]
  J --> M[Help]
  J --> N[Logout]
```

## Flow Notes

The app uses a root stack to switch between the auth flow and the main app. The Home tab nests a restaurant stack so restaurant detail and cart can hide the tab bar. The Profile tab hosts a drawer navigator with custom content, and the app persists mock auth, onboarding, and cart state with AsyncStorage.

## Deep Link

`foodapp://restaurant/123` opens the restaurant detail screen for the matching restaurant id.
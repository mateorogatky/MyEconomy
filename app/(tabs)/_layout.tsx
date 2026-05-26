import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import React from 'react';
import "react-native-gesture-handler";
import 'react-native-get-random-values';
import "react-native-reanimated";
import { colors } from '../../src/theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.bg },
        headerTintColor: colors.text,
        tabBarStyle: { backgroundColor: '#1f2b30', borderTopColor: colors.border },
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.subtle,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="movimientos"
        options={{
          title: 'Movimientos',
          tabBarLabel: 'Movs.',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="swap-vertical" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="recientes"
        options={{
          title: 'Recientes',
          tabBarLabel: 'Recientes',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="recurrentes"
        options={{
          title: 'Recurrentes',
          tabBarLabel: 'Recurrentes',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="repeat" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="metas"
        options={{
          title: 'Metas',
          tabBarLabel: 'Metas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trophy" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="ajustes"
        options={{
          title: 'Ajustes',
          tabBarLabel: 'Ajustes',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

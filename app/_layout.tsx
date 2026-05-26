// 👇 estos dos PRIMERO de todo
import "react-native-gesture-handler";
import "react-native-reanimated";

import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import "react-native-get-random-values"; // antes de usar uuid en cualquier parte
import { AppProvider } from "../src/state/AppContext";
import { colors } from "../src/theme";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar barStyle="light-content" />
      <AppProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.bg },
          }}
        >
          <Stack.Screen name="(tabs)" />
        </Stack>
      </AppProvider>
    </GestureHandlerRootView>
  );
}

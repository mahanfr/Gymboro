import { Tabs, usePathname, useRouter } from "expo-router";
import React from "react";
import { Platform, TouchableOpacity } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const pathName = usePathname();
  const router = useRouter();

  const pathNameToTitle = (): string => {
    return pathName.split("/").pop() || "Gymboro";
  };

  return (
    <Tabs
      initialRouteName="index"
      backBehavior="initialRoute"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: true,
        headerTitle: pathNameToTitle(),
        headerLeft: () => {
          if (pathName === "/") {
            return null;
          }
          return (
            <TouchableOpacity
              style={{ marginHorizontal: 10 }}
              onPress={() => router.back()}
            >
              <Ionicons
                name="arrow-back"
                size={24}
                color={Colors[colorScheme ?? "light"].tint}
              />
            </TouchableOpacity>
          );
        },
        headerRight: () => {
          if (pathName === "/settings") {
            return null;
          }
          return (
            <TouchableOpacity
              style={{ marginHorizontal: 10 }}
              onPress={() => router.push("/settings")}
            >
              <MaterialIcons
                name="settings"
                size={28}
                color={Colors[colorScheme ?? "light"].tint}
              />
            </TouchableOpacity>
          );
        },
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="explore"
        options={{
          title: "Workouts",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="fitness-center" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="diet"
        options={{
          title: "Diet",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="restaurant" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

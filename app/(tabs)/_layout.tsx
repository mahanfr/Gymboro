import { Tabs, usePathname, useRouter } from "expo-router";
import React from "react";
import { Platform, TouchableOpacity } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useContext } from "react";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Settings_createcontext } from "../../app/_layout";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function TabLayout() {
  // const colorScheme = useColorScheme();
  const context = useContext(Settings_createcontext);

  const { settings, setSettings } = context ?? { settings: { lightMode: true }, setSettings: () => {} };
  let lightMode = settings.lightMode;

  const backgroundColor = lightMode ? Colors.light.background : Colors.dark.background;
  const borderColor = lightMode ? Colors.light.borderColor : Colors.dark.borderColor;
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
        tabBarActiveTintColor: lightMode ? Colors["light"].tint : Colors["dark"].tint,
        headerShown: true,
        headerTitle: pathNameToTitle(),
        headerLeft: () => {
          if (pathName === "/" || pathName === "/diet" || pathName === "/explore") {
            return null;
          }
          return (
            <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color={lightMode ? Colors["light"].tint : Colors["dark"].tint} />
            </TouchableOpacity>
          );
        },
        headerRight: () => {
          if (pathName === "/settings") {
            return null;
          }
          return (
            <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => router.push("/settings")}>
              <MaterialIcons name="settings" size={28} color={lightMode ? Colors["light"].tint : Colors["dark"].tint} />
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
          tabBarIcon: ({ color }) => <MaterialIcons name="fitness-center" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="diet"
        options={{
          title: "Diet",
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="restaurant" color={color} />,
        }}
      />
    </Tabs>
  );
}

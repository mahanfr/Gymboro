import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState, createContext } from "react";
import "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useNavigation } from "expo-router";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
export interface ISettings {
  weightInc: string;
  lightMode: boolean;
}
export const Settings_createcontext = createContext<{
  settings: ISettings;
  setSettings: React.Dispatch<React.SetStateAction<ISettings>>;
} | null>(null);
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const navigation: any = useNavigation();
  const [loaded] = useFonts({ SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf") });

  const [settings, setSettings] = useState<ISettings>({
    weightInc: "1.0",
    lightMode: true,
  });

  const getLocalSettings = async () => {
    try {
      const value = await AsyncStorage.getItem("global-settings");
      if (value !== null) {
        setSettings(JSON.parse(value));
      }
    } catch (e) {
      console.log(e);
    }
  };
  // getLocalSettings();
  useEffect(() => {
    getLocalSettings();
  }, [settings.weightInc]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <ThemeProvider value={!settings.lightMode ? DarkTheme : DefaultTheme}>
      <Settings_createcontext.Provider value={{ settings, setSettings }}>
        <Stack screenOptions={{ animation: "none" }}>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </Settings_createcontext.Provider>
    </ThemeProvider>
  );
}

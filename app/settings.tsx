import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState, createContext, useContext } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Settings_createcontext } from "../app/_layout";
export interface ISettings {
  weightInc: string;
  lightMode: boolean;
}

export default function Settings() {
  const [sett, setSett] = useState<ISettings>({
    weightInc: "1.0",
    lightMode: true,
  });

  const getLocalSettings = async () => {
    try {
      const value = await AsyncStorage.getItem("global-settings");
      if (value !== null) {
        setSett(JSON.parse(value));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const setLocalSettings = async () => {
    try {
      const jsonValue = JSON.stringify(sett);
      await AsyncStorage.setItem("global-settings", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getLocalSettings();
  }, []);

  useEffect(() => {
    setLocalSettings();
    setSettings(sett);
  }, [sett]);

  const context = useContext(Settings_createcontext);
  if (!context) {
    throw new Error("ThemedView must be used within a SettingsContext.Provider");
  }
  const { settings, setSettings } = context;

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ThemedView>
          <ThemedText>Weight Increment:</ThemedText>
          <TextInput style={styles.textInput} keyboardType="numeric" value={sett?.weightInc} onChangeText={(val) => setSett({ ...sett, weightInc: val })} />
          <ThemedText>
            Light Mode:
            <Text style={styles.toggle} onPress={() => setSett({ ...sett, lightMode: !sett.lightMode })}>
              {sett.lightMode ? "On" : "Off"}
            </Text>
          </ThemedText>
        </ThemedView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  text: {
    backgroundColor: "#1e1e1e",
    padding: 18,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: "white",
    color: "black",
    padding: 5,
  },
  toggle: {
    // backgroundColor: "blue",
    borderColor: "red",
    borderWidth: 1,
    padding: 2,
  },
});

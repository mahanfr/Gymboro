import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export interface ISettings {
  weightInc: string;
}

export default function Settings() {
  const [settings, setSettings] = useState<ISettings>({
    weightInc: "1.0",
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

  const setLocalSettings = async () => {
    try {
      const jsonValue = JSON.stringify(settings);
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
  }, [settings]);

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ThemedView>
          <ThemedText>Weight Increment:</ThemedText>
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            value={settings?.weightInc}
            onChangeText={(val) => setSettings({ ...settings, weightInc: val })}
          />
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
});

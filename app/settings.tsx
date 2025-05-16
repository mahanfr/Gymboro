import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState, createContext, useContext } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Settings_createcontext } from "../app/_layout";
import { useTranslation } from "react-i18next";
export interface ISettings {
  weightInc: string;
  lightMode: boolean;
}

export default function Settings() {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;

  const [sett, setSett] = useState<ISettings>({
    weightInc: "1.0",
    lightMode: true,
  });

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem("language");
      if (savedLanguage) {
        i18n.changeLanguage(savedLanguage);
      }
    };
    loadLanguage();
  }, [i18n]);

  const changeLanguage = async (lang: string) => {
    await AsyncStorage.setItem("language", lang);
    i18n.changeLanguage(lang);
  };

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
          <TextInput
            style={styles.textInput}
            keyboardType="numeric"
            value={sett?.weightInc}
            onChangeText={(val) => setSett({ ...sett, weightInc: val })}
          />
          <ThemedText>
            {t("settings.theme")}:
            <Text
              style={!sett.lightMode ? styles.toggle_on : styles.toggle_off}
              onPress={() => setSett({ ...sett, lightMode: false })}
            >
              Dark
            </Text>
            <Text
              style={sett.lightMode ? styles.toggle_on : styles.toggle_off}
              onPress={() => setSett({ ...sett, lightMode: true })}
            >
              Light
            </Text>
          </ThemedText>
          <ThemedText>{t("language")}:</ThemedText>
          <View style={styles.flex}>
            <ThemedText
              style={currentLanguage === "en-US" ? styles.toggle_on : styles.toggle_off}
              onPress={() => changeLanguage("en-US")}
            >
              En
            </ThemedText>
            <ThemedText
              style={currentLanguage === "fa-IR" ? styles.toggle_on : styles.toggle_off}
              onPress={() => changeLanguage("fa-IR")}
            >
              Fa
            </ThemedText>
          </View>
        </ThemedView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  flex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
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
  toggle_on: {
    borderColor: "red",
    borderWidth: 1,
    padding: 2,
  },
  toggle_off: {
    borderColor: "red",
    borderWidth: 0,
    padding: 2,
  },
});

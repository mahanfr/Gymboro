import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState, createContext, useContext } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Settings_createcontext } from "../app/_layout";
import { useTranslation } from "react-i18next";
import { MaterialIcons } from "@expo/vector-icons";
import Svg, { Line } from "react-native-svg";
export interface ISettings {
  weightInc: string;
  lightMode: boolean;
}

export default function Settings() {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;
  const isEnglish = i18n.language === "en-US";

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
          <View
            style={{
              padding: 6,
              display: "flex",
              flexDirection: isEnglish ? "row" : "row-reverse",
            }}
          >
            <ThemedText type="defaultSemiBold">{t("settings.weight_inc")}</ThemedText>
            <TextInput
              style={styles.textInput}
              keyboardType="numeric"
              value={sett?.weightInc}
              onChangeText={(val) => setSett({ ...sett, weightInc: val })}
            />
          </View>
          <Line_ />
          <View
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: isEnglish ? "row" : "row-reverse",
              padding: 6,
            }}
          >
            <ThemedText type="defaultSemiBold">{t("settings.theme")}:</ThemedText>
            <MaterialIcons
              size={30}
              color={sett.lightMode ? "black" : "white"}
              onPress={() => {
                setSett({ ...sett, lightMode: !sett.lightMode });
              }}
              name={!sett.lightMode ? "light-mode" : "dark-mode"}
            ></MaterialIcons>
          </View>
          <Line_ />
          <View
            style={[styles.flex, { padding: 6, flexDirection: isEnglish ? "row" : "row-reverse" }]}
          >
            <MaterialIcons
              size={30}
              color={sett.lightMode ? "black" : "white"}
              name="language"
            ></MaterialIcons>
            <ThemedText type="defaultSemiBold">{t("language")}:</ThemedText>
            <ThemedText
              style={currentLanguage === "en-US" ? styles.toggle_on : styles.toggle_off}
              onPress={() => changeLanguage("en-US")}
            >
              English
            </ThemedText>
            <ThemedText
              style={currentLanguage === "fa-IR" ? styles.toggle_on : styles.toggle_off}
              onPress={() => changeLanguage("fa-IR")}
            >
              فارسی
            </ThemedText>
          </View>
          <Line_ />
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
    textAlign: "center",
    width: 50,
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
const Line_ = () => {
  return (
    <Svg height="2" width="100%">
      <Line x1="0" y1="1" x2="100%" y2="1" stroke="#96969696" strokeWidth="2" />
    </Svg>
  );
};

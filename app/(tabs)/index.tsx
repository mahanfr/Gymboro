import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, ScrollView } from "react-native";
import { useState, useRef, useEffect } from "react";
import PopupManager, { usePopupManager } from "@/components/Popup";
import Routine from "@/components/Routine";
import { useNavigation } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { categories } from "@/data/DataTypes";
import * as SQLite from "expo-sqlite";
import { useTranslation } from "react-i18next";

export default function HomeScreen() {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;
  const isEnglish = i18n.language === "en-US";
  const { popups, showPopup, hidePopup } = usePopupManager();
  const navigation: any = useNavigation();
  const db = SQLite.useSQLiteContext();

  const [routines, setRoutines] = useState<any>();
  const [sql, setSql] = useState<string>("");

  async function injectSQL(command: string) {
    const wks = await db.getAllAsync(command);
    console.log(wks);
  }
  const getData = async () => {
    const wks = await db.getAllAsync("SELECT * FROM routine");
    setRoutines(wks);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView>
      <ThemedText type="subtitle">{t("routine.Routines") + ":"}</ThemedText>
      {routines?.map((item: any, index: number) => (
        <Routine
          title={item.title}
          numberOfMoves={4} //TODO get this from DB
          involvedMuscles={[categories.chest]}
          onPress={() => {
            navigation.navigate("routine/index", { id: item.id });
          }}
        />
      ))}
      <PopupManager popups={popups} onClose={hidePopup} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 8,
    padding: 4,
    marginBottom: 8,
  },
  size: {
    height: Dimensions.get("window").height - 50,
  },
});

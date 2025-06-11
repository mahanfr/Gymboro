import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { Button, ScrollView } from "react-native";
import { useState, useRef, useEffect } from "react";
import PopupManager, { usePopupManager } from "@/components/Popup";
import Routine from "@/components/Routine";
import { useNavigation } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { categories } from "@/data/DataTypes";
import * as SQLite from "expo-sqlite";

export default function HomeScreen() {
  const { popups, showPopup, hidePopup } = usePopupManager();
  const navigation: any = useNavigation();
  const db = SQLite.useSQLiteContext();

  const [routines, setRoutines] = useState<any>();

  const getData = async () => {
    const wks = await db.getAllAsync("SELECT * FROM routine");
    setRoutines(wks);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView>
      <ThemedText type="subtitle">Routines:</ThemedText>
      {routines?.map((item: any, index: number) => (
        <Routine
          title={item.title}
          numberOfMoves={4}
          involvedMuscles={[categories.chest]}
          onPress={() => {
            navigation.navigate("routine/index");
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

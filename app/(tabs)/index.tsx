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
import Routine from "@/app/Routine/Routine";
import { useNavigation } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { categories } from "@/data/DataTypes";
import * as SQLite from "expo-sqlite";

export default function HomeScreen() {
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
    const wks = await db.getAllAsync("SELECT * FROM workout");
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView>
      <ThemedText type="subtitle">Routines:</ThemedText>
      <Routine
        title="Chesterday"
        numberOfMoves={4}
        involvedMuscles={[categories.chest]}
        onPress={() => {
          navigation.navigate("Routine/RoutineView");
        }}
      />

      <View>
        <TextInput
          style={{ borderWidth: 1, padding: 2, margin: 2, height: 80 }}
          placeholder="INSERT INTO * ..."
          value={sql}
          onChange={(event) => {
            setSql(event.nativeEvent.text);
          }}
        ></TextInput>
        <Button title="sql injection" onPress={() => injectSQL(sql)} />
      </View>
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

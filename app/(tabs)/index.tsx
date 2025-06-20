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
import { Category } from "@/data/DataTypes";

type Routine = [{ id: number; title: string }];

function findTwoMostRepeated<T>(arr: T[]): [T, T] | T[] {
  const frequencyMap = new Map<T, number>();

  // Count frequencies
  for (const item of arr) {
    frequencyMap.set(item, (frequencyMap.get(item) || 0) + 1);
  }

  // Convert to array of [item, count] and sort by count (descending)
  const sortedEntries = Array.from(frequencyMap.entries()).sort((a, b) => b[1] - a[1]);

  // Handle cases where the array has fewer than 2 unique elements
  if (sortedEntries.length === 0) return [];
  if (sortedEntries.length === 1) return [sortedEntries[0][0]];

  // Return the top two most frequent elements
  return [sortedEntries[0][0], sortedEntries[1][0]];
}

export default function HomeScreen() {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;
  const isEnglish = i18n.language === "en-US";
  const { popups, showPopup, hidePopup } = usePopupManager();
  const navigation: any = useNavigation();
  const db = SQLite.useSQLiteContext();

  const [routines, setRoutines] = useState<Routine>();
  const [numberOfW, setNumberOfW] = useState<number[]>([0]);
  const [muscleCategory, setMuscleCategory] = useState<string[][]>([]);

  async function getCategory(id: number) {
    const workout = await db.getAllAsync(`SELECT category FROM workout WHERE id = ${id}`);
    let a = workout as { category: string }[];
    return a[0]; // type of Category
  }

  const getData = async () => {
    let category = [];
    const rts = (await db.getAllAsync("SELECT * FROM routine")) as Routine;
    if (rts) {
      var n = [];
      var c;
      let all_c = [];
      for (const routine of rts) {
        //TODO is this correct? idk my deepseek not working
        const workouts_routine = await db.getAllAsync(
          `SELECT * FROM routine_workout WHERE routine = ${routine.id}`
        );
        n.push(workouts_routine.length);
        category = [];
        for (const row of workouts_routine) {
          let workout_id = (row as { workout: number }).workout;
          c = await getCategory(workout_id);
          category.push(c.category);
        }
        all_c.push(findTwoMostRepeated(category));
      }

      setMuscleCategory(all_c);
      setNumberOfW(n);
    }
    setRoutines(rts as Routine);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView>
      <ThemedText type="subtitle" style={{ textAlign: isEnglish ? "left" : "right", padding: 4 }}>
        {t("routine.Routines") + ":"}
      </ThemedText>
      {routines?.map((item: any, index: number) => (
        <Routine
          key={item.id}
          title={item.title}
          numberOfMoves={numberOfW[index]}
          involvedMuscles={muscleCategory[index] as Category[]}
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

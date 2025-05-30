import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { Button, ScrollView } from "react-native";
import { useState, useRef } from "react";
import ExerciseItem from "@/components/ExerciseItem";
import { IExercise, ISet } from "@/data/Exercise";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import PopupManager, { usePopupManager } from "@/components/Popup";
import { MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import Routine from "@/app/Routine/Routine";
import RoutineView from "@/app/Routine/RoutineView";

export default function HomeScreen() {
  const defaultSet: ISet = { rep: 5, weight: 10 };
  const { t } = useTranslation();
  const defaultExercise: IExercise = {
    title: "New Exercise",
    sets: [defaultSet],
  };
  const [exercises, setExercises] = useState<IExercise[]>([defaultExercise]);
  const { popups, showPopup, hidePopup } = usePopupManager();

  return (
    <ScrollView>
      <SafeAreaProvider>
        <SafeAreaView>
          {/* <ThemedView style={styles.card}>
            {exercises.map((ex, index) => (
              <ExerciseItem key={index} exercise={ex} />
            ))}
            <Button
              title={t("home.new_exercise")}
              onPress={() => {
                setExercises((prevExercises) => [...prevExercises, defaultExercise]);
              }}
            />
          </ThemedView> */}
          <RoutineView />
          <TouchableOpacity
            style={{ alignSelf: "center" }}
            onPress={() =>
              showPopup({ popupKey: "errorPopup", message: "This is an error message" })
            }
          >
            <MaterialIcons name="goat" color={"black"} size={28} />
          </TouchableOpacity>
          <PopupManager popups={popups} onClose={hidePopup} />
        </SafeAreaView>
      </SafeAreaProvider>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 8,
    // backgroundColor: "#1e1e1e",
    padding: 4,
    marginBottom: 8,
  },
  size: {
    // width: "50%",
    height: Dimensions.get("window").height - 50,
  },
});

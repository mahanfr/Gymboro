import ExerciseItem from "@/components/ExerciseItem";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IExercise, ISet } from "@/data/Exercise";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, StyleSheet, View } from "react-native";

const StartWorkout = () => {
  const defaultSet: ISet = { rep: 5, weight: 10 };
  const { t } = useTranslation();
  const defaultExercise: IExercise = {
    title: "New Exercise",
    sets: [defaultSet],
  };
  const [exercises, setExercises] = useState<IExercise[]>([defaultExercise]);
  return (
    <ThemedView style={styles.card}>
      <ThemedView
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ThemedText style={styles.timer}>00:00:00</ThemedText>
      </ThemedView>
      {exercises.map((ex, index) => (
        <ExerciseItem key={index} exercise={ex} />
      ))}
      <Button
        title={t("home.new_exercise")}
        onPress={() => {
          setExercises((prevExercises) => [...prevExercises, defaultExercise]);
        }}
      />
    </ThemedView>
  );
};
export default StartWorkout;
const styles = StyleSheet.create({
  timer: {
    fontSize: 42,
    padding: 10,
  },
  card: {
    gap: 8,
    // backgroundColor: "#1e1e1e",
    padding: 4,
    marginBottom: 8,
  },
});

import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { Button, ScrollView } from "react-native";
import { useState } from "react";
import ExerciseItem from "@/components/ExerciseItem";
import { IExercise, ISet } from "@/data/Exercise";

export default function HomeScreen() {
  const defaultSet: ISet = { rep: 5, weight: 10 };
  const defaultExercise: IExercise = {
    title: "New Exercise",
    sets: [defaultSet],
  };
  const [exercises, setExercises] = useState<IExercise[]>([defaultExercise]);
  return (
    <ScrollView>
      <ThemedView style={styles.card}>
        {exercises.map((ex, index) => (
          <ExerciseItem key={index} exercise={ex} />
        ))}
        <Button
          title="Add Exercise"
          onPress={() => {
            setExercises((prevExercises) => [
              ...prevExercises,
              defaultExercise,
            ]);
          }}
        />
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 8,
    backgroundColor: "#1e1e1e",
    padding: 4,
    marginBottom: 8,
  },
});

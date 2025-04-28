import { Alert, StyleSheet, TextInput } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button, ScrollView, Text, View } from "react-native";
import { useState } from "react";
import ExerciseItem, { IExercise, ISet } from "@/components/ExerciseItem";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const defaultSet: ISet = { rep: 5, weight: 10 };
  const defaultExercise: IExercise = {
    title: "New Exercise",
    sets: [defaultSet],
  };
  const [exercises, setExercises] = useState<IExercise[]>([defaultExercise]);
  return (
    <SafeAreaProvider>
      <SafeAreaView>
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
      </SafeAreaView>
    </SafeAreaProvider>
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

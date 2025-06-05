import {
  Button,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  VirtualizedList,
} from "react-native";
import { ThemedText } from "../../components/ThemedText";
import { ThemedView } from "../../components/ThemedView";
import { MusclesActivation } from "@/data/DataTypes";
import MuscleFront from "../../components/MuscleFront";
import MuscleBack from "../../components/MuscleBack";
import { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import ExerciseCard from "@/components/ExerciseCard";
import { useNavigation } from "expo-router";
import * as SQLite from "expo-sqlite";
import { CalculateRepWeight } from "../calculators/rep_weight";

const theDataOfThisRoutineThatShouldBeCalculatedAndNotHardCoded = CalculateRepWeight({
  sets: [{ rep: 10, weight: 10 }],
  workoutId: 1,
});
const RoutineView = () => {
  const navigation: any = useNavigation();
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [editMode, setEditMode] = useState(false);

  // const getData = async () => {
  //   const db = await SQLite.openDatabaseAsync("database.db");
  //   const wks = await db.getAllAsync("SELECT * FROM routine");
  //   setWorkouts(wks);
  //   console.log(wks);
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <ScrollView>
      <ThemedView style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <MuscleGraph />
      </ThemedView>
      <View style={{ paddingHorizontal: 5 }}>
        <ThemedView
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 4,
            borderBottomWidth: 1,
          }}
        >
          <ThemedText type="subtitle">Modves:</ThemedText>
          <TouchableOpacity
            onPress={() => {
              setEditMode(!editMode);
            }}
          >
            <MaterialIcons
              name={editMode ? "check-circle" : "edit"}
              color={editMode ? "green" : "black"}
              size={28}
            />
          </TouchableOpacity>
        </ThemedView>
        <ExerciseCard
          title="BenchPress Barbel"
          key={0}
          image={require("../../assets/images/move_demonstration/bench_press_barbell/e1.webp")}
          onPress={() => navigation.navigate("workouts/[id]", { id: 0 })}
        />
        <TouchableOpacity onPress={() => navigation.navigate("workouts/[id]", { id: 0 })}>
          <ThemedView style={styles.workout}>
            <ThemedView style={{ maxWidth: "60%" }}>
              <ThemedText>Bench Press </ThemedText>
            </ThemedView>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <Image
                source={require("../../assets/images/move_demonstration/bench_press_barbell/e1.webp")}
                style={{ width: 80, height: 80 }}
              />
              <TouchableOpacity onPress={() => {}} style={{ display: editMode ? "flex" : "none" }}>
                <MaterialIcons name="delete" color={"red"} size={28} />
              </TouchableOpacity>
            </View>
          </ThemedView>
        </TouchableOpacity>
        <View style={{ marginVertical: 4 }}>
          <Button title="Start" />
        </View>
      </View>
    </ScrollView>
  );
};
const MuscleGraph = () => {
  return (
    <ThemedView style={styles.flex}>
      <View style={{ width: "50%" }}>
        <MuscleFront
          style={styles.size}
          activator={theDataOfThisRoutineThatShouldBeCalculatedAndNotHardCoded}
        />
      </View>
      <View style={{ width: "50%" }}>
        <MuscleBack
          style={styles.size}
          activator={theDataOfThisRoutineThatShouldBeCalculatedAndNotHardCoded}
        />
      </View>
    </ThemedView>
  );
};
export default RoutineView;
const styles = StyleSheet.create({
  flex: {
    display: "flex",
    width: "100%",
    justifyContent: "space-evenly",
    paddingVertical: 10,
    flexDirection: "row",
  },
  workout: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    marginBottom: 4,
  },
  size: {
    height: Dimensions.get("window").height / 3,
  },
  dateSelector: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  dates: {
    paddingHorizontal: 5,
    paddingVertical: 3,
    textAlign: "center",
    borderRadius: 20,
    width: 50,
    marginHorizontal: 2,
  },
});

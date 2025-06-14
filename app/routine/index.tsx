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

const theDataOfThisRoutineThatShouldBeCalculatedAndNotHardCoded = new MusclesActivation({
  chest: 3,

  shin: 0,
  tibialis_anterior: 0,
  extensor_digitorum_longus: 0,

  traps: 0,
  upper_trapezius: 0,
  middle_trapezius: 0,
  lower_trapezius: 0,

  biceps: 0,
  biceps_short_head: 0,
  biceps_long_head: 0,
  brachialis: 0,

  triceps: 0,
  triceps_lateral_head: 0,
  triceps_long_head: 0,
  triceps_medial_head: 0,

  forearms: 0,
  brachioradialis: 5,
  wrist_extensors: 5,
  wrist_flexors: 5,

  abs: 5,
  obliques: 4,

  adductors: 3,

  abductors: 5,

  quadriceps: 5,
  vastus_lateralis: 5,
  vastus_intermedius: 5,
  vastus_medialis: 5,

  calves: 0,

  shoulders: 0,
  anterior_deltoid: 0,
  lateral_deltoid: 0,
  posterior_deltoid: 0,

  upper_back: 0,
  serratus_anterior: 0,
  teres: 0,
  infraspinatus: 0,

  lats: 0,

  glutes: 3,

  hamstrings: 0,
  biceps_femoris: 0,
  semitendinosus: 0,
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
          <Button
            title="Start"
            onPress={() => {
              navigation.navigate("routine/start");
            }}
          />
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

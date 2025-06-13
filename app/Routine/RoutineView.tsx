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
import { calculateByRoutine, normolizeNumbers0To6 } from "../calculators/rep_weight";

const RoutineView = () => {
  const db = SQLite.useSQLiteContext();
  const navigation: any = useNavigation();
  const [editMode, setEditMode] = useState(false);

  const [muscleData, setMuscleData] = useState(new MusclesActivation());

  useEffect(() => {
    const fetchMuscleData = async () => {
      const data = await calculateByRoutine(1, db);
      setMuscleData(new MusclesActivation(normolizeNumbers0To6(data)));
    };
    fetchMuscleData();
  }, []);

  return (
    <ScrollView>
      <ThemedView style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <ThemedView style={styles.flex}>
          <View style={{ width: "50%" }}>
            <MuscleFront style={styles.size} activator={muscleData} />
          </View>
          <View style={{ width: "50%" }}>
            <MuscleBack style={styles.size} activator={muscleData} />
          </View>
        </ThemedView>
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
    height: Dimensions.get("window").height / 2,
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

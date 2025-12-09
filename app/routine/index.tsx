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
import { getColors, MusclesActivation } from "@/data/DataTypes";
import MuscleFront from "../../components/MuscleFront";
import MuscleBack from "../../components/MuscleBack";
import { useContext, useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import ExerciseCard from "@/components/ExerciseCard";
import { useNavigation, useLocalSearchParams } from "expo-router";
import * as SQLite from "expo-sqlite";
import {
  calculateByRoutine,
  normolizeNumbers0To6,
  workoutsOfRoutine,
} from "../calculators/rep_weight";
import { useTranslation } from "react-i18next";
import { Settings_createcontext } from "../_layout";
import images from "@/data/import_images";

const RoutineView = () => {
  const db = SQLite.useSQLiteContext();
  const navigation: any = useNavigation();
  const { i18n, t } = useTranslation();
  const isEnglish = i18n.language === "en-US";
  const { id } = useLocalSearchParams();
  const [editMode, setEditMode] = useState(false);
  const [workouts, setWorkouts] = useState<
    { id: number; name: string; name_fa: string; image: string }[]
  >([]);

  const [muscleData, setMuscleData] = useState(new MusclesActivation());

  const context = useContext(Settings_createcontext);
  const { settings, setSettings } = context ?? {
    settings: { lightMode: true },
    setSettings: () => {},
  };
  let lightMode = settings.lightMode;
  async function handleWorkoutDelete(workout_id: number) {
    await db.getAllAsync(`DELETE FROM routine_workout WHERE workout = ${workout_id}`);
    fetchMuscleData();
  }
  const fetchMuscleData = async () => {
    const data = await calculateByRoutine(Number(id), db); // Ensure id is a number
    const workoutsFromdb = await workoutsOfRoutine(Number(id), db);
    setMuscleData(new MusclesActivation(normolizeNumbers0To6(data)));
    setWorkouts(workoutsFromdb);
  };
  useEffect(() => {
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
      <ThemedView>
        <ThemedText style={{ textAlign: "center", padding: 4 }}>
          {t("stats.Amount_of_involvements")}
        </ThemedText>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: 6,
            borderBottomWidth: 1,
          }}
        >
          <ThemedText>{t("stats.less")}</ThemedText>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <View
              key={i}
              style={{
                backgroundColor: getColors(i),
                width: 25,
                height: 25,
                marginHorizontal: 2,
              }}
            ></View>
          ))}
          <ThemedText>{t("stats.more")}</ThemedText>
        </View>
      </ThemedView>
      <View style={{ paddingHorizontal: 5 }}>
        <ThemedView
          style={{
            display: "flex",
            flexDirection: isEnglish ? "row" : "row-reverse",
            justifyContent: "space-between",
            padding: 6,
            borderBottomWidth: 1,
          }}
        >
          <ThemedText type="subtitle">{t("routine.Moves") + ":"}</ThemedText>
          <TouchableOpacity
            style={{
              display: editMode ? "flex" : workouts.length < 1 ? "flex" : "none",
              flexDirection: "row",
            }}
            onPress={() => {
              navigation.navigate("(tabs)", { screen: "explore" });
              setEditMode(false);
            }}
          >
            <ThemedText type="subtitle">{t("routine.add_workout")}</ThemedText>
            <MaterialIcons name={"add-circle"} color={"green"} size={28} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setEditMode(!editMode);
            }}
            style={{ display: workouts.length < 1 ? "none" : "contents" }}
          >
            <MaterialIcons
              name={editMode ? "check-circle" : "edit"}
              color={editMode ? "green" : lightMode ? "black" : "white"}
              size={28}
            />
          </TouchableOpacity>
        </ThemedView>
        {workouts?.map((w) => (
          <ExerciseCard
            title={isEnglish ? w.name : w.name_fa}
            key={w.id}
            editMode={editMode}
            onDelete={() => handleWorkoutDelete(w.id)}
            image={images[w.image]}
            onPress={() => navigation.navigate("workouts/[id]", { id: w.id })}
          />
        ))}

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

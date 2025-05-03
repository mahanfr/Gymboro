import { StyleSheet, Image, Platform, Dimensions, View, ScrollView } from "react-native";

import MuscleBack from "@/components/MuscleBack";
import MuscleFront from "@/components/MuscleFront";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import ExerciseCard from "../../components/ExerciseCard";
import WorkoutDetails from "../[workoutDetails]";

export default function TabTwoScreen() {
  return (
    <ScrollView>
      <SafeAreaProvider>
        <SafeAreaView>
          <View style={[styles.flex]}>
            {/* <MuscleBack style={styles.size} />
          <MuscleFront style={styles.size} /> */}
            {/* <ExerciseCard /> */}
            <WorkoutDetails />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  flex: {
    // display: "flex",
    // width: "100%",
    // flexDirection: "row",
  },
  border: {
    borderColor: "white",
    borderWidth: 1,
  },
  size: {
    width: "50%",
    height: Dimensions.get("window").height,
  },
  // marginTop: {
  //   marginTop: 30,
  // },
});

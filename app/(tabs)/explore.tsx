import { StyleSheet, Image, Platform, Dimensions, View, ScrollView } from "react-native";

import MuscleBack from "@/components/MuscleBack";
import MuscleFront from "@/components/MuscleFront";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import ExerciseCard from "../../components/ExerciseCard";
import WorkoutDetails from "../[workoutDetails]";

let list: {
  titleEnglish: string;
  titleFarsi: string;
  detailEnglish: string;
  detailFarsi: string;
  image: string;
}[] = [
  {
    titleEnglish: "Shoulders",
    titleFarsi: "سر شانه ها",
    detailEnglish: "the thing near neck",
    detailFarsi: "هر سه عضله ی سر شانه ها",
    image: "404.png", //only give the name of the image
  },
];
export default function TabTwoScreen() {
  return (
    <ScrollView>
      <SafeAreaProvider>
        <SafeAreaView>
          <View style={[styles.flex]}>
            {/* <MuscleBack style={styles.size} />
          <MuscleFront style={styles.size} /> */}
            {list.map((item) => (
              <ExerciseCard
                key={0}
                isLightMode={false}
                isEnglish={false}
                titleEnglish={item.titleEnglish}
                titleFarsi={item.titleFarsi}
                detailEnglish={item.detailEnglish}
                detailFarsi={item.detailFarsi}
                // image={item.image}
              />
            ))}
            {/* <WorkoutDetails /> */}
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
});

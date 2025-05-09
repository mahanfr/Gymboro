import { StyleSheet, Image, Platform, Dimensions, View, ScrollView } from "react-native";

import MuscleBack from "@/components/MuscleBack";
import MuscleFront from "@/components/MuscleFront";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import ExerciseCard from "../../components/ExerciseCard";

let list: {
  titleEnglish: string;
  titleFarsi: string;
  detailEnglish: string;
  detailFarsi: string;
  image: NodeJS.Require;
}[] = [
  {
    titleEnglish: "Shoulders",
    titleFarsi: "سر شانه ها",
    detailEnglish: "All three shoulder muscles",
    detailFarsi: "هر سه عضله ی سر شانه ها",
    image: require("../../assets/images/groups_icon/shoulders_icon.png"), //No you can't make it string or use (+) oporation
    //TODO please fix the newly added pictures... have to merge some muscles like chest and also rename them properly tnx
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
            {list.map((item, index) => (
              <ExerciseCard
                key={index}
                // isLightMode={false}
                isEnglish={false}
                titleEnglish={item.titleEnglish}
                titleFarsi={item.titleFarsi}
                detailEnglish={item.detailEnglish}
                detailFarsi={item.detailFarsi}
                image={item.image}
              />
            ))}
            {/*<WorkoutDetails id={0} /> */}
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
    // width: "50%",
    height: Dimensions.get("window").height - 50,
  },
});

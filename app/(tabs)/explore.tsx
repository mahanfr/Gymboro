import { StyleSheet, Image, Platform, Dimensions, View, ScrollView, Text, Button } from "react-native";

import MuscleBack from "@/components/MuscleBack";
import MuscleFront from "@/components/MuscleFront";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import ExerciseCard from "../../components/ExerciseCard";
import { useNavigation } from "expo-router";

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
  const navigation: any = useNavigation();
  return (
    <ScrollView>
      <SafeAreaProvider>
        <SafeAreaView>
          <View style={[styles.flex]}>
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
                onPress={() => {
                  navigation.navigate("muscles/[muscle]", { muscle: "chest" });
                }}
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
});

import { StyleSheet, Image, Platform, Dimensions, View, ScrollView, Text, Button } from "react-native";

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
    titleEnglish: "Chest",
    titleFarsi: "سینه",
    detailEnglish: "All three chest muscles",
    detailFarsi: "هر سه عضله ی سینه",
    image: require("../../assets/images/muscle_groups/chest.png"),
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
  size: {
    height: Dimensions.get("window").height / 2,
  },
});

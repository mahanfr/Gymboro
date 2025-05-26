import {
  StyleSheet,
  Image,
  Platform,
  Dimensions,
  View,
  ScrollView,
  Text,
  Button,
} from "react-native";

import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import ExerciseCard from "../../components/ExerciseCard";
import { useNavigation } from "expo-router";
import { categories } from "@/data/DataTypes";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <ScrollView>
      <SafeAreaProvider>
        <SafeAreaView>
          <View style={[styles.flex]}>
            {Object.entries(categories).map((item, index) => (
              <ExerciseCard
                title={t(`workouts.categories.${item[0]}`)}
                key={index}
                image={item[1]}
                onPress={() => {
                  navigation.navigate("muscles/[muscle]", { muscle: item[0] });
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

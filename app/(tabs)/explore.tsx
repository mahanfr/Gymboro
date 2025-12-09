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

export default function TabTwoScreen() {
  const navigation: any = useNavigation();
  const { t } = useTranslation();

  return (
    <ScrollView>
      <View style={[styles.flex]}>
        {Object.entries(categories).map((item, index) => {
          if (item[0] === "rest") return;
          return (
            <ExerciseCard
              title={t(`workouts.categories.${item[0]}`)}
              key={index}
              image={item[1]}
              onDelete={() => {}}
              onPress={() => {
                navigation.navigate("muscles/[muscle]", {
                  muscle: item[0],
                  preload: true, // any value, just prevents undefined params
                });
              }}
            />
          );
        })}
        {/*<WorkoutDetails id={0} /> */}
      </View>
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

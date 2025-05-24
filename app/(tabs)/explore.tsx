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
import { useTranslation } from "react-i18next";

export default function TabTwoScreen() {
  const navigation: any = useNavigation();
  const { t } = useTranslation();

  let categories = [
    ["shoulders", require("../../assets/images/muscle_groups/shoulders.png")],
    ["chest", require("../../assets/images/muscle_groups/chest.png")],
    ["back", require("../../assets/images/muscle_groups/back.png")],
    ["full_body", require("../../assets/images/muscle_groups/full_body.png")],
    ["biceps", require("../../assets/images/muscle_groups/biceps.png")],
    ["triceps", require("../../assets/images/muscle_groups/triceps.png")],
    ["legs", require("../../assets/images/muscle_groups/legs.png")],
    ["core", require("../../assets/images/muscle_groups/core.png")],
    ["cardio", require("../../assets/images/muscle_groups/cardio.png")],
  ];

  return (
    <ScrollView>
      <SafeAreaProvider>
        <SafeAreaView>
          <View style={[styles.flex]}>
            {categories.map((item, index) => (
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

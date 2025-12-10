import {
  StyleSheet,
  Image,
  Platform,
  Dimensions,
  View,
  ScrollView,
  Text,
  Button,
  FlatList,
} from "react-native";

import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import ExerciseCard from "../../components/ExerciseCard";
import { useNavigation } from "expo-router";
import { categories } from "@/data/DataTypes";
import { useTranslation } from "react-i18next";

export default function TabTwoScreen() {
  const navigation: any = useNavigation();
  const { t } = useTranslation();
  const data = Object.entries(categories).filter(([key]) => key !== "rest");
  return (
    <FlatList
      removeClippedSubviews={false}
      data={data}
      keyExtractor={([key]) => key}
      renderItem={({ item }) => {
        const [key, value] = item;

        return (
          <ExerciseCard
            title={t(`workouts.categories.${key}`)}
            // image={value}
            onDelete={() => {}}
            onPress={() =>
              navigation.navigate("muscles/[muscle]", {
                muscle: key,
                preload: true,
              })
            }
          />
        );
      }}
      contentContainerStyle={styles.flex}
      showsVerticalScrollIndicator={false}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
    />
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

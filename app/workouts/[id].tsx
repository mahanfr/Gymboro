import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { View, Image, StyleSheet, ScrollView, Dimensions } from "react-native";
import { useEffect, useRef, useState } from "react";
import Svg, { Circle } from "react-native-svg";
import { useLocalSearchParams, useNavigation } from "expo-router";
import * as SQLite from "expo-sqlite";
import { useTranslation } from "react-i18next";
import images from "../../data/import_images";

type WorkoutDetailsProps = {
  id: number;
};

const { width, height } = Dimensions.get("window");
// const images = [
//   require("../../assets/images/move_demonstration/bench_press_barbell/e1.webp"),
//   require("../../assets/images/move_demonstration/bench_press_barbell/d1.webp"),
//   require("../../assets/images/move_demonstration/bench_press_barbell/b1.jpg"),
//   require("../../assets/images/move_demonstration/bench_press_barbell/b2.jpg"),
//   require("../../assets/images/move_demonstration/bench_press_barbell/a1.png"),
//   require("../../assets/images/move_demonstration/bench_press_barbell/a2.png"),
//   require("../../assets/images/move_demonstration/bench_press_barbell/c1.jpg"),
//   require("../../assets/images/move_demonstration/bench_press_barbell/c2.jpg"),
// ];
const WorkoutDetails = () => {
  const formatDescription = (text: string): string => {
    if (!text) return "";
    return text.replace(/\.\s*/g, ".\n").trimEnd();
  };
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();

  const { i18n, t } = useTranslation();
  const isEnglish = i18n.language === "en-US";

  const [workout, setWorkout] = useState<any>({
    id: 0,
    name: "Workout Details",
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / width);
    setCurrentIndex(index);
  };

  useEffect(() => {
    navigation.setOptions({
      title: workout.name || "Workout Details",
    });
  }, [workout.name]);

  const db = SQLite.useSQLiteContext();
  useEffect(() => {
    const getData = async () => {
      const wks = await db.getAllAsync(`SELECT * FROM workout WHERE id=${id}`);
      setWorkout(wks[0]);
    };
    getData();
  }, []);

  return (
    <ScrollView>
      <ThemedView style={{ padding: 6, paddingBottom: 10 }}>
        <View style={styles.wrapper}>
          <View style={styles.slide}>
            <Image style={styles.image} source={images[workout.image]} />
          </View>
        </View>

        <ThemedView style={{ padding: 6 }}>
          <ThemedText type="subtitle" style={{ textAlign: "center", padding: 5 }}>
            {isEnglish ? workout.name : workout.name_fa}
          </ThemedText>
          <ThemedText style={{ textAlign: isEnglish ? "left" : "right" }}>
            {formatDescription(isEnglish ? workout.description : workout.description_fa)}
          </ThemedText>
        </ThemedView>
        <ThemedText type="subtitle" style={{ textAlign: "center", padding: 5 }}>
          <ThemedText>{t(`workouts.index.instructions`)}</ThemedText>
        </ThemedText>
        <ThemedText style={{ textAlign: isEnglish ? "left" : "right" }}>
          {formatDescription(isEnglish ? workout.instructions : workout.instructions_fa)
            .split("\n")
            .map((line, index) => (
              <View style={{ marginBottom: 4 }}>
                <ThemedText key={index}>
                  {index + 1}. {line} {"\n"}
                </ThemedText>
              </View>
            ))}
          {}
        </ThemedText>
      </ThemedView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: height * 0.5,
    position: "relative",
    marginBottom: 15,
  },
  scrollContent: {
    alignItems: "center",
  },
  slide: {
    width: width,
    height: height * 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  dotsContainer: {
    position: "absolute",
    bottom: -18,
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  border: {
    borderColor: "black",
    borderWidth: 2,
  },
});

export default WorkoutDetails;

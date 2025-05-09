import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { View, Image, StyleSheet, ScrollView, Dimensions } from "react-native";
import { useEffect, useRef, useState } from "react";
import Svg, { Circle } from "react-native-svg";
import { useLocalSearchParams, useNavigation } from "expo-router";

type WorkoutDetailsProps = {
  id: number;
};

const WORKOUTS = [
  { name: "Bench Press", description: "Chest exercise" },
  { name: "Squats", description: "Leg exercise" },
];

const { width, height } = Dimensions.get("window");
const images = [
  require("../../assets/images/move_demonstration/bench_press_barbell/d1.webp"),
  require("../../assets/images/move_demonstration/bench_press_barbell/b1.jpg"),
  require("../../assets/images/move_demonstration/bench_press_barbell/b2.jpg"),
  require("../../assets/images/move_demonstration/bench_press_barbell/a1.png"),
  require("../../assets/images/move_demonstration/bench_press_barbell/a2.png"),
  require("../../assets/images/move_demonstration/bench_press_barbell/c1.jpg"),
  require("../../assets/images/move_demonstration/bench_press_barbell/c2.jpg"),
];

const WorkoutDetails = () => {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const workout = WORKOUTS[Number(id)];
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

  return (
    <ThemedView>
      <View style={styles.wrapper}>
        <ScrollView
          ref={scrollRef}
          horizontal={true}
          contentContainerStyle={styles.scrollContent}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {images.map((image, index) => (
            <View style={styles.slide} key={index}>
              <Image style={styles.image} source={image} />
            </View>
          ))}
        </ScrollView>

        <View style={styles.dotsContainer}>
          <Svg height={20} width={images.length * (6 + 10)}>
            {images.map((_, index) => (
              <Circle key={index} cx={index * 15 + 10} cy="10" r="5" fill={index === currentIndex ? "#0F0" : "#ccc"} />
            ))}
          </Svg>
        </View>
      </View>
      <ThemedView>
        <ThemedText type="subtitle">Bench Press</ThemedText>
        <ThemedText>other stuff how to do it and stuff</ThemedText>
      </ThemedView>
    </ThemedView>
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

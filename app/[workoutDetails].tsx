import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

const WorkoutDetails = () => {
  return (
    <ThemedView>
      <View style={styles.wrapper}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} /*we don need the pc mouse version */ pagingEnabled={true}>
          <View>
            <Image style={styles.image} source={require("../assets/images/move_demonstration/bench_press_barbell/d1.webp")} />
          </View>
          <View>
            <Image style={styles.image} source={require("../assets/images/move_demonstration/bench_press_barbell/b1.jpg")} />
          </View>
          <View>
            <Image style={styles.image} source={require("../assets/images/move_demonstration/bench_press_barbell/b2.jpg")} />
          </View>
          <View>
            <Image style={styles.image} source={require("../assets/images/move_demonstration/bench_press_barbell/a1.png")} />
          </View>
          <View>
            <Image style={styles.image} source={require("../assets/images/move_demonstration/bench_press_barbell/a2.png")} />
          </View>
          <View>
            <Image style={styles.image} source={require("../assets/images/move_demonstration/bench_press_barbell/c1.jpg")} />
          </View>
          <View>
            <Image style={styles.image} source={require("../assets/images/move_demonstration/bench_press_barbell/c2.jpg")} />
          </View>
        </ScrollView>
      </View>
      <ThemedView></ThemedView>
      <ThemedText>don't change this page amma go it myself</ThemedText>
    </ThemedView>
  );
};
const styles = StyleSheet.create({
  wrapper: {},
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  image: {
    width: 150,
    height: 150,
    // height: "50%",
  },
});
export default WorkoutDetails;

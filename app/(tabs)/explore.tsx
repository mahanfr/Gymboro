import { StyleSheet, Image, Platform, Dimensions } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import MuscleBack from "@/components/MuscleBack";
import MuscleFront from "@/components/MuscleFront";
import {
  SafeAreaFrameContext,
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";

export default function TabTwoScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ThemedView style={styles.flex}>
          <MuscleBack style={styles.size} />
          <MuscleFront style={styles.size} />
        </ThemedView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  flex: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
  },
  border: {
    borderColor: "white",
    borderWidth: 1,
  },
  size: {
    width: "50%",
    height: Dimensions.get("window").height,
  },
});

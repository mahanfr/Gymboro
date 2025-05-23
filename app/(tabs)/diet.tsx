import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import SimpleLineChart from "@/components/LineChart";
import GityChart from "@/components/GityChart";
import Hexygon from "@/components/Hexygon";
import { ScrollView, ScrollViewBase } from "react-native";
import MuscleGraph from "@/components/MuscleGraph";
import userStats from "@/data/userStats";
import Svg, { Line } from "react-native-svg";

export default function Diet() {
  return (
    <ScrollView>
      <SafeAreaProvider>
        <SafeAreaView>
          <ThemedView>
            <MuscleGraph activator={userStats().muscleGroup} />
            <Line_ />
            <SimpleLineChart />
            <Line_ />
            <GityChart data={userStats().gittyChart} />
            <Line_ />
            <Hexygon data={userStats().hexygon} />
            <Line_ />
          </ThemedView>
        </SafeAreaView>
      </SafeAreaProvider>
    </ScrollView>
  );
}
const Line_ = () => {
  return (
    <Svg height="2" width="100%">
      <Line x1="0" y1="1" x2="100%" y2="1" stroke="black" strokeWidth="2" />
    </Svg>
  );
};

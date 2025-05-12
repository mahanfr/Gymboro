import { ThemedView } from "./ThemedView";
import MuscleBack from "@/components/MuscleBack";
import MuscleFront from "@/components/MuscleFront";
import { Dimensions, StyleSheet } from "react-native";

interface IProps {
  activation?: boolean;
}

export default function MuscleGraph(props: IProps) {
  const activator = new MusclesActivation();
  return (
    <ThemedView style={styles.flex}>
      <MuscleBack style={styles.size} activator={activator} />
      <MuscleFront style={styles.size} activator={activator} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingVertical: 10,
  },
  size: {
    height: Dimensions.get("window").height - 50,
  },
});

export class MusclesActivation {
  chest = 0;

  shin = 0;
  tibialis_anterior = 0;
  extensor_digitorum_longus = 0;

  traps = 0;
  upper_trapezius = 0;
  middle_trapezius = 0;
  lower_trapezius = 0;

  biceps = 0;
  biceps_short_head = 0;
  biceps_long_head = 0;
  brachialis = 0;

  triceps = 0;
  triceps_lateral_head = 0;
  triceps_long_head = 0;
  triceps_medial_head = 0;

  forearms = 0;
  brachioradialis = 0;
  wrist_extensors = 0;
  wrist_flexors = 0;

  abs = 0;
  obliques = 0;

  adductors = 0;

  abductors = 0;

  quadriceps = 0;
  vastus_lateralis = 0;
  vastus_intermedius = 0;
  vastus_medialis = 0;

  calves = 0;

  shoulders = 0;
  anterior_deltoid = 0;
  lateral_deltoid = 0;
  posterior_deltoid = 0;

  upper_back = 0;
  serratus_anterior = 0;
  teres = 0;
  infraspinatus = 0;

  lats = 0;

  glutes = 0;

  hamstrings = 0;
  biceps_femoris = 0;
  semitendinosus = 0;

  public getColor(activation_value: number): string {
    switch (activation_value) {
      case 0:
        return "#ffe4ea";
      case 1:
        return "#ff91ab";
      case 2:
        return "#ef6c6e";
      case 3:
        return "#ff2357";
      case 4:
        return "#80122c";
      case 5:
        return "#400916";
      default:
        return "#bebebe";
    }
  }
}

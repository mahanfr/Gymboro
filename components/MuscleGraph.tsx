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
      <MuscleBack style={styles.size} />
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
  upper_pectoralis_major = 0;
  lower_pectoralis_major = 0;
  pectoralis_minor = 0;

  shin = 0;
  tibialis_anterior = 0;
  extensor_digitorum_longus = 0;

  traps = 0;
  levator_scapulae = 0;
  upper_trapezius = 0;
  middle_trapezius = 0;
  lower_trapezius = 0;

  biceps = 0;
  biceps_short_head = 0;
  biceps_long_head = 0;

  triceps = 0;
  triceps_brachii_lateral_head = 0;
  triceps_brachii_long_head = 0;
  triceps_brachii_medial_head = 0;
  brachialis = 0;

  forearms = 0;
  brachioradialis = 0;
  wrist_extensors = 0;
  wrist_flexors = 0;

  abs = 0;
  obliques = 0;
  rectus_abdominis = 0;

  adductors = 0;
  adductor_brevis = 0;
  adductor_longus = 0;
  gracilis = 0;
  adductor_magnus = 0;

  abductors = 0;
  pectineus = 0;
  sartorius = 0;

  quadriceps = 0;
  vastus_lateralis = 0;
  vastus_intermedius = 0;
  rectus_femoris = 0;
  vastus_medialis = 0;

  calves = 0;
  gastrocnemius_medial_head = 0;
  gastrocnemius_lateral_head = 0;
  soleus = 0;
  plantaris = 0;
  popliteus = 0;

  shoulders = 0;
  anterior_deltoid = 0;
  lateral_deltoid = 0;
  posterior_deltoid = 0;
  infraspinatus = 0;
  supraspinatus = 0;

  upper_back = 0;
  serratus_anterior = 0;
  teres_minor = 0;
  teres_major = 0;
  rhomboids = 0;

  lower_back = 0;
  latissimus_dorsi = 0;
  erector_spinae = 0;

  glutes = 0;
  gluteus_medius = 0;
  gluteus_minimus = 0;
  gluteus_maximus = 0;

  hamstrings = 0;
  biceps_femoris = 0;
  semitendinosus = 0;
  semimembranosus = 0;

  public getColor(muscle: string): string {
    switch (muscle) {
      case "chest":
        return "#003f5c";
      case "shin":
        return "#58508d";
      case "traps":
        return "#8a508f";
      case "biceps":
        return "#bc5090";
      case "triceps":
        return "#de5a79";
      case "forearms":
        return "#ff6361";
      case "abs":
        return "#ff8531";
      case "adductors":
        return "#ffa600";
      case "abductors":
        return "#003f5c";
      case "quadriceps":
        return "#58508d";
      case "calves":
        return "#8a508f";
      case "shoulders":
        return "#bc5090";
      case "upper_back":
        return "#ff6361";
      case "glutes":
        return "#de5a79";
      case "hamstrings":
        return "#ff8531";
      case "lower_back":
        return "#ffa600";
      default:
        return "#bebebe";
    }
  }
}

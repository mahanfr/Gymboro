import { ThemedView } from "./ThemedView";
import MuscleBack from "@/components/MuscleBack";
import MuscleFront from "@/components/MuscleFront";
import { Dimensions, StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { Settings_createcontext } from "../app/_layout";

type activatorsType = {
  _1day?: MusclesActivation;
  _1week?: MusclesActivation;
  _1month?: MusclesActivation;
  _3months?: MusclesActivation;
  _1year?: MusclesActivation;
  all?: MusclesActivation;
};
interface MuscleGraphProps {
  activator: {
    _1day?: MusclesActivation;
    _1week?: MusclesActivation;
    _1month?: MusclesActivation;
    _3months?: MusclesActivation;
    _1year?: MusclesActivation;
    all?: MusclesActivation;
  };
}

const MuscleGraph: React.FC<MuscleGraphProps> = ({ activator }) => {
  const context = useContext(Settings_createcontext);
  const { settings, setSettings } = context ?? { settings: { lightMode: true }, setSettings: () => {} };
  let lightMode = settings.lightMode;

  // let activator = new MusclesActivation();

  const [selectedDateRange, setSelectedDateRange] = useState(0);
  const [activators, setActivators] = useState<MusclesActivation>(new MusclesActivation());

  useEffect(() => {
    switch (selectedDateRange) {
      case 0:
        setActivators(activator._1day ? activator._1day : new MusclesActivation());
        break;
      case 1:
        setActivators(activator._1week ? activator._1week : new MusclesActivation());
        break;
      case 2:
        setActivators(activator._1month ? activator._1month : new MusclesActivation());
        break;
      case 3:
        setActivators(activator._3months ? activator._3months : new MusclesActivation());
        break;
      case 4:
        setActivators(activator._1year ? activator._1year : new MusclesActivation());
        break;
      case 5:
        setActivators(activator.all ? activator.all : new MusclesActivation());
        break;
      default:
        setActivators(new MusclesActivation());
    }
  }, [selectedDateRange, activators]);

  return (
    <View>
      <View style={styles.dateSelector}>
        {["1D", "1W", "1M", "3M", "1Y", "All"].map((label, index) => (
          <ThemedText
            key={index}
            lightMode={!lightMode}
            style={[styles.dates, selectedDateRange === index && { backgroundColor: lightMode ? "#ddd" : "#555" }]}
            onPress={() => setSelectedDateRange(index)}
          >
            {label}
          </ThemedText>
        ))}
      </View>
      <ThemedView style={styles.flex}>
        <View style={{ width: "50%" }}>
          <MuscleFront style={styles.size} activator={activators} />
        </View>
        <View style={{ width: "50%" }}>
          <MuscleBack style={styles.size} activator={activators} />
        </View>
      </ThemedView>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    display: "flex",
    width: "100%",
    justifyContent: "space-evenly",
    paddingVertical: 10,
    flexDirection: "row",
  },
  size: {
    height: Dimensions.get("window").height / 2,
  },
  dateSelector: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  dates: {
    paddingHorizontal: 5,
    paddingVertical: 3,
    textAlign: "center",
    borderRadius: 20,
    width: 50,
    marginHorizontal: 2,
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

  constructor(init?: Partial<MusclesActivation>) {
    Object.assign(this, init);
  }

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
export default MuscleGraph;

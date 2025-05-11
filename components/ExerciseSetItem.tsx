import { StyleSheet, Button, TextInput, View, Text } from "react-native";
import { ThemedText } from "./ThemedText";
import Svg, { Path } from "react-native-svg";
import { useContext } from "react";
import { Settings_createcontext } from "../app/_layout";
import { Colors } from "../constants/Colors";

interface IProps {
  id: number;
  rep: number;
  weight: number;
  lastWeight?: number;
  lastRep?: number;
  onDestroy: (id: number) => void;
  onUpdate: (id: number, rep: number, weight: number) => void;
}
export default function ExerciseSetItem(props: IProps) {
  var rep = props.rep;
  var weight = props.weight;
  const context = useContext(Settings_createcontext);

  const { settings, setSettings } = context ?? { settings: { lightMode: true }, setSettings: () => {} };
  let lightMode = settings.lightMode;

  return (
    <View style={styles.container}>
      <ThemedText style={styles.x}>{props.id + 1}</ThemedText>
      <View style={styles.flexChild}>
        <ThemedText>
          {props.lastRep}x{props.lastWeight}Kg
        </ThemedText>
      </View>
      <View style={styles.button}>
        <ThemedText type="title" onPress={() => props.onUpdate(props.id, rep - 1, weight)}>
          -
        </ThemedText>
        <ThemedText
          type="title"
          style={{
            color: lightMode ? Colors.dark.color : Colors.light.color,
            padding: 2,
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 60,
            borderRadius: 20,
            backgroundColor: lightMode ? Colors.dark.background : Colors.light.background,
          }}
        >
          {props.rep}
        </ThemedText>
        <ThemedText type="title" onPress={() => props.onUpdate(props.id, rep + 1, weight)}>
          +
        </ThemedText>
      </View>
      <View style={styles.button}>
        <ThemedText type="title" onPress={() => props.onUpdate(props.id, rep, weight - 1)}>
          -
        </ThemedText>
        <ThemedText
          type="title"
          style={{
            color: lightMode ? Colors.dark.color : Colors.light.color,
            padding: 2,
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 60,
            borderRadius: 20,
            backgroundColor: lightMode ? Colors.dark.background : Colors.light.background,
          }}
        >
          {props.weight}
        </ThemedText>
        <ThemedText type="title" onPress={() => props.onUpdate(props.id, rep, weight + 1)}>
          +
        </ThemedText>
      </View>
      <View style={styles.x}>
        <Text onPress={() => props.onDestroy(props.id)}>
          <X color={lightMode ? Colors.light.color : Colors.dark.color} />
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  exerciseValueInput: {
    backgroundColor: "#f00",
    borderRadius: 50,
    width: 50,
    padding: 4,
    textAlign: "center",
  },
  flexChild: {
    width: "29%",
    color: "white",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
  },
  button: {
    width: "29%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  x: {
    width: "6.5%",
    textAlign: "center",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 2,
  },
});
const X = ({ color }: { color: string }) => {
  return (
    <Svg fill="none" strokeWidth="1.5" stroke="white" width={30} height={30} viewBox="0 0 24 24" aria-hidden={true}>
      <Path stroke={color} strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"></Path>
    </Svg>
  );
};

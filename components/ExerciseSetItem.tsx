import { StyleSheet, Button, TextInput, View, Text } from "react-native";
import { ThemedText } from "./ThemedText";
import Svg, { Path } from "react-native-svg";
import { useContext } from "react";
import { Settings_createcontext } from "../app/_layout";
import { Colors } from "../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";

interface IProps {
  id: number;
  rep: number;
  weight: number;
  lastWeight?: number;
  lastRep?: number;
  disable?: boolean;
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
      <ThemedText>{props.id + 1}</ThemedText>
      <ThemedText style={styles.flexChild}>
        {props.lastRep}x{props.lastWeight}Kg
      </ThemedText>
      <View style={styles.button}>
        <ThemedText type="title" style={{ display: props.disable ? "none" : "flex" }} onPress={() => props.onUpdate(props.id, rep - 1, weight)}>
          -
        </ThemedText>
        <ThemedText
          style={{
            color: lightMode ? Colors.dark.color : Colors.light.color,
            fontSize: 20,
            padding: 2,
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 4,
            width: 50,
            borderRadius: 4,
            backgroundColor: lightMode ? Colors.dark.background : Colors.light.background,
          }}
        >
          {props.rep}
        </ThemedText>
        <ThemedText type="title" style={{ display: props.disable ? "none" : "flex" }} onPress={() => props.onUpdate(props.id, rep + 1, weight)}>
          +
        </ThemedText>
      </View>
      <View style={styles.button}>
        <ThemedText type="title" style={{ display: props.disable ? "none" : "flex" }} onPress={() => props.onUpdate(props.id, rep, weight - 1)}>
          -
        </ThemedText>
        <ThemedText
          style={{
            color: lightMode ? Colors.dark.color : Colors.light.color,
            fontSize: 20,
            padding: 2,
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 4,
            width: 50,
            borderRadius: 4,
            backgroundColor: lightMode ? Colors.dark.background : Colors.light.background,
          }}
        >
          {props.weight}
        </ThemedText>
        <ThemedText type="title" style={{ display: props.disable ? "none" : "flex" }} onPress={() => props.onUpdate(props.id, rep, weight + 1)}>
          +
        </ThemedText>
      </View>
      <View>
        <Text onPress={() => props.onDestroy(props.id)}>
          <MaterialIcons name="remove-circle-outline" size={28} color={props.disable ? "transparent" : "#c83b60"} />
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
    textAlign: "center",
  },
  button: {
    width: "29%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  flex: {
    width: "29%",
    display: "flex",
    alignItems: "center",
  },
  border: {
    borderColor: "white",
    borderWidth: 1,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
    paddingHorizontal: 5,
  },
});
const X = ({ color }: { color: string }) => {
  return (
    <Svg fill="none" strokeWidth="1.5" stroke="white" width={30} height={30} viewBox="0 0 24 24" aria-hidden={true}>
      <Path stroke={color} strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"></Path>
    </Svg>
  );
};

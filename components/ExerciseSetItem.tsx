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
      <ThemedText style={styles.flexChild}>
        <ThemedText>
          {props.lastRep}x{props.lastWeight}Kg
        </ThemedText>
      </ThemedText>
      <View style={styles.button}>
        <Text style={{ color: lightMode ? Colors.light.color : Colors.dark.color, fontSize: 30 }} onPress={() => props.onUpdate(props.id, rep - 1, weight)}>
          -
        </Text>
        {/* TODO Input sucks asssss the performence issue was input shit */}
        {/* TODO we cannnnnn put input and do some fuckery-do-do to fix the preformence issue buttttt i can't be fucked tbh */}
        {/* <TextInput
          style={[
            styles.exerciseValueInput,
            { backgroundColor: lightMode ? Colors.dark.background : Colors.light.background, color: lightMode ? Colors.dark.color : Colors.light.color },
          ]}
          value={props.rep.toString()}
          onChangeText={(text: string) => {
            props.onUpdate(props.id, Number.parseInt(text), weight);
          }}
          keyboardType="numeric"
        /> */}

        <Text
          style={{
            color: lightMode ? Colors.dark.color : Colors.light.color,
            fontSize: 30,
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
        </Text>
        <Text style={{ color: lightMode ? Colors.light.color : Colors.dark.color, fontSize: 30 }} onPress={() => props.onUpdate(props.id, rep + 1, weight)}>
          +
        </Text>
      </View>
      <View style={styles.button}>
        <Text style={{ color: lightMode ? Colors.light.color : Colors.dark.color, fontSize: 30 }} onPress={() => props.onUpdate(props.id, rep, weight - 1)}>
          -
        </Text>
        {/* <TextInput
          style={[
            styles.exerciseValueInput,
            { backgroundColor: lightMode ? Colors.dark.background : Colors.light.background, color: lightMode ? Colors.dark.color : Colors.light.color },
          ]}
          value={weight.toString()}
          onChangeText={(text: string) => {
            props.onUpdate(props.id, rep, Number.parseInt(text));
          }}
          keyboardType="numeric"
        /> */}
        <Text
          style={{
            color: lightMode ? Colors.dark.color : Colors.light.color,
            fontSize: 30,
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
        </Text>
        <Text style={{ color: lightMode ? Colors.light.color : Colors.dark.color, fontSize: 30 }} onPress={() => props.onUpdate(props.id, rep, weight + 1)}>
          +
        </Text>
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
    // minHeight: 35,
    backgroundColor: "#f00",
    // paddingInline: 2,
    borderRadius: 50,
    width: 50,
    padding: 4,
    textAlign: "center",
  },
  flexChild: {
    width: "29%",
    color: "white",
    textAlign: "center",
  },
  button: {
    width: "29%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    // color: "white",
    // textAlign: "center",
  },
  themedText: {
    fontSize: 30,
  },
  x: {
    width: "6.5%",
    textAlign: "center",
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

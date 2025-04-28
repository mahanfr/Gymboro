import { useEffect, useState } from "react";
import { Button } from "react-native";
import { Alert, StyleSheet, TextInput, View, Text } from "react-native";
import { ThemedText } from "./ThemedText";

interface IProps {
  id: number;
  rep: number;
  weight: number;
  onDestroy: (id: number) => void;
}

export default function ExerciseSetItem(props: IProps) {
  const [rep, setRep] = useState<number>(props.rep);
  const [weight, setWeight] = useState<number>(props.weight);

  useEffect(() => {
    if (rep <= 0 || weight <= 0) {
      props.onDestroy(props.id);
    }
  }, [rep, weight]);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        // paddingVertical: 5,
      }}
    >
      <ThemedText style={styles.x}>{props.id + 1}</ThemedText>
      <ThemedText style={styles.flexChild}>
        <Text>10x20kg</Text>
      </ThemedText>
      <View style={styles.flexChild}>
        <Button title="+" color="#000" onPress={() => setRep(rep + 1)} />
        <TextInput
          style={[styles.exerciseValueInput, { outline: "none" }]}
          value={rep.toString()}
          onChangeText={(text: string) => {
            setRep(Number.parseInt(text));
          }}
        />
        <Button title="-" color="#000" onPress={() => setRep(rep - 1)} />
      </View>
      <View style={styles.flexChild}>
        <Button title="+" color="#000" onPress={() => setWeight(weight + 1)} />
        <TextInput
          style={[styles.exerciseValueInput, { outline: "none" }]}
          value={weight.toString() + "kg"}
          onChangeText={(text: string) => {
            setWeight(Number.parseInt(text));
          }}
        />
        <Button title="-" color="#000" onPress={() => setWeight(weight - 1)} />
      </View>
      <View style={styles.x}>
        <Button title="X" color="#000" onPress={() => alert("pp")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  exerciseValueInput: {
    minHeight: 35,
    backgroundColor: "#fff",
    paddingInline: 2,
    width: 50,
    textAlign: "center",
    outline: "none",
  },
  flexChild: {
    flexDirection: "row",
    alignItems: "center",
    width: "27%",
    color: "white",
    textAlign: "center",
  },
  x: {
    width: "9.5%",
    textAlign: "center",
  },
});

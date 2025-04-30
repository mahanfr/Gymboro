import { useEffect, useState } from "react";
import { Button } from "react-native";
import { StyleSheet, TextInput, View, Text } from "react-native";
import { ThemedText } from "./ThemedText";

interface IProps {
  id: number;
  rep: number;
  weight: number;
  onDestroy: (id: number) => void;
  onUpdate: (id: number, rep: number, weight: number) => void;
}

export default function ExerciseSetItem(props: IProps) {
  var rep = props.rep;
  var weight = props.weight;

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
        <Button title="+" color="#000" onPress={() => props.onUpdate(props.id, rep + 1, weight)} />
        <TextInput
          style={[styles.exerciseValueInput, { outline: "none" }]}
          value={props.rep.toString()}
          onChangeText={(text: string) => {
            props.onUpdate(props.id, Number.parseInt(text), weight)
          }}
        />
        <Button title="-" color="#000" onPress={() => props.onUpdate(props.id, rep - 1, weight)} />
      </View>
      <View style={styles.flexChild}>
        <Button title="+" color="#000" onPress={() => props.onUpdate(props.id, rep , weight + 1)} />
        <TextInput
          style={[styles.exerciseValueInput, { outline: "none" }]}
          value={weight.toString() + "kg"}
          onChangeText={(text: string) => {
            props.onUpdate(props.id, rep , Number.parseInt(text))
          }}
        />
        <Button title="-" color="#000" onPress={() => props.onUpdate(props.id, rep , weight - 1)} />
      </View>
      <View style={styles.x}>
        <Button title="X" color="#000" onPress={() => props.onDestroy(props.id)} />
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
  button: {
    flexDirection: "row",
    alignItems: "center",
    color: "white",
    textAlign: "center",
  },
  x: {
    width: "9.5%",
    textAlign: "center",
  },
  flex: {
    width: "27%",
    display: "flex",
    alignItems: "center",
  },
});

import { useEffect, useState } from "react";
import { Button } from "react-native";
import { StyleSheet, TextInput, View, Text } from "react-native";
import { ThemedText } from "./ThemedText";
import Svg, { Path } from "react-native-svg";
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
  return (
    <View style={styles.container}>
      <ThemedText style={styles.x}>{props.id + 1}</ThemedText>
      <ThemedText style={styles.flexChild}>
        <Text>{props.lastRep}x{props.lastWeight}Kg</Text>
      </ThemedText>
      <View style={styles.button}>
        <Button
          title="-"
          color="#000"
          onPress={() => props.onUpdate(props.id, rep - 1, weight)}
        />
        <TextInput
          style={[styles.exerciseValueInput]}
          value={props.rep.toString()}
          onChangeText={(text: string) => {
            props.onUpdate(props.id, Number.parseInt(text), weight);
          }}
          keyboardType="numeric"
        />
        <Button
          title="+"
          color="#000"
          onPress={() => props.onUpdate(props.id, rep + 1, weight)}
        />
      </View>
      <View style={styles.button}>
        <Button
          title="-"
          color="#000"
          onPress={() => props.onUpdate(props.id, rep, weight - 1)}
        />
        <TextInput
          style={[styles.exerciseValueInput]}
          value={weight.toString()}
          onChangeText={(text: string) => {
            props.onUpdate(props.id, rep, Number.parseInt(text));
          }}
          keyboardType="numeric"
        />
        <Button
          title="+"
          color="#000"
          onPress={() => props.onUpdate(props.id, rep, weight + 1)}
        />
      </View>
      <View style={styles.x}>
        <Text onPress={() => props.onDestroy(props.id)}>
          <Svg
            data-slot="icon"
            fill="none"
            stroke-width="1.5"
            stroke="white"
            width={30}
            height={30}
            viewBox="0 0 24 24"
            aria-hidden={true}
          >
            <Path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            ></Path>
          </Svg>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  exerciseValueInput: {
    // minHeight: 35,
    backgroundColor: "#fff",
    // paddingInline: 2,
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

    color: "white",
    textAlign: "center",
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

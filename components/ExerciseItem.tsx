import { useState } from "react";
import { Button, Text, TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import ExerciseSetItem from "./ExerciseSetItem";
import { ThemedText } from "./ThemedText";
import { IExercise, ISet } from "@/data/Exercise";
import { ThemedView } from "./ThemedView";
import Svg, { Path } from "react-native-svg";
import { MaterialIcons } from "@expo/vector-icons";

interface IProps {
  exercise: IExercise;
}

export default function ExerciseItem(props: IProps) {
  const defaultSet: ISet = { rep: 5, weight: 10 };

  const [title, setTitle] = useState<string>(props.exercise.title);
  const [titleOnFocus, setTitleOnFocus] = useState<boolean>(false);
  const [sets, setSets] = useState<ISet[]>(props.exercise.sets ? props.exercise.sets : [defaultSet]);

  const destroySet = (id: number) => {
    let newSets = [...sets];
    newSets.splice(id, 1);
    setSets(newSets);
  };

  const updateSet = (id: number, rep: number, weight: number) => {
    if (rep < 1 || !rep) {
      let newSet = [...sets];
      newSet[id] = { rep: 1, weight: weight };
      setSets(newSet);
      // rep = 1;
    } else if (weight < 1 || !weight) {
      let newSet = [...sets];
      newSet[id] = { rep: rep, weight: 1 };
      setSets(newSet);
      // weight = 1;
    } else {
      let newSet = [...sets];
      newSet[id] = { rep: rep, weight: weight };
      setSets(newSet);
    }
  };
  return (
    <ThemedView style={styles.container}>
      <View style={[styles.flex, { paddingHorizontal: 10 }]}>
        {titleOnFocus ? (
          <TextInput style={styles.textInput} onChangeText={(val: string) => setTitle(val)} onBlur={() => setTitleOnFocus(false)} value={title} />
        ) : (
          <ThemedText onPress={() => setTitleOnFocus(true)}>{title}</ThemedText>
        )}
        <View style={[styles.flex]}>
          <TouchableOpacity onPress={() => {}}>
            <MaterialIcons name="remove-circle" color={"#b93e51"} size={28} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.flex}>
        <ThemedText style={styles.x}>set</ThemedText>
        <ThemedText style={styles.header}>Last</ThemedText>
        <ThemedText style={styles.header}>rep</ThemedText>
        <ThemedText style={styles.header}>weight (KG)</ThemedText>
        <ThemedText style={styles.x}></ThemedText>
      </View>
      <View>
        {sets.map((item, index) => (
          <ExerciseSetItem
            key={index} //bruh
            id={index}
            rep={item.rep}
            weight={item.weight}
            lastRep={5}
            lastWeight={10}
            onUpdate={updateSet}
            onDestroy={destroySet}
          />
        ))}
        <TouchableOpacity
          style={[styles.flex, { marginHorizontal: 5, justifyContent: "center", borderWidth: 2, paddingVertical: 8, borderColor: "#51e081" }]}
          onPress={() => {
            setSets((prevSets) => [...prevSets, defaultSet]);
          }}
        >
          <ThemedText style={{ fontSize: 16, color: "#51e081" }}>ADD SET</ThemedText>
        </TouchableOpacity>
        {/*
        <View style={[styles.flex, { justifyContent: "flex-end", marginHorizontal: 10 }]}>
          <TouchableOpacity
            onPress={() => {
              setSets((prevSets) => [...prevSets, defaultSet]);
            }}
          >
            <MaterialIcons name="add-circle" color={"#30e361"} size={28} />
          </TouchableOpacity>
        </View>
       */}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  header: {
    width: "29%",
    textAlign: "center",
  },
  x: {
    width: "6.5%",
    textAlign: "center",
  },
  container: {
    // borderColor: "white",
    borderStyle: "solid",
    borderWidth: 1,
    // borderBottomColor: "white",
    marginBottom: 5,
    padding: 5,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#ffffff10",
  },
  textInput: {
    backgroundColor: "white",
    padding: 4,
  },
});

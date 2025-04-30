import { useState } from "react";
import { Button, Text, TextInput, View, StyleSheet } from "react-native";
import ExerciseSetItem from "./ExerciseSetItem";
import { ThemedText } from "./ThemedText";

export interface ISet {
  rep: number;
  weight: number;
}

export interface IExercise {
  title: string;
  sets?: ISet[];
}

interface IProps {
  exercise: IExercise;
}

export default function ExerciseItem(props: IProps) {
  const defaultSet: ISet = { rep: 5, weight: 10 };

  const [title, setTitle] = useState<string>(props.exercise.title);
  const [titleOnFocus, setTitleOnFocus] = useState<boolean>(false);
  const [sets, setSets] = useState<ISet[]>(
    props.exercise.sets ? props.exercise.sets : [defaultSet]
  );

  const destroySet = (id: number) => {
    let newSets = [...sets]
    newSets.splice(id, 1)
    setSets(newSets);
  };

  const updateSet = (id: number, rep: number, weight: number) => {
    if (rep < 1) { rep = 1 }
    else if (weight < 1) { weight = 1 }
    else {
      let newSet = [...sets]
      newSet[id] = {rep: rep, weight: weight}
      setSets(newSet)
    }
  }
  return (
    <View style={styles.container}>
      <View style={[styles.flex, {paddingHorizontal: 10}]}>
        {titleOnFocus ? (
          <TextInput
            style={{ backgroundColor: "#fff", padding: 4, outline: "none" }}
            onChangeText={(val: string) => setTitle(val)}
            onBlur={() => setTitleOnFocus(false)}
            value={title}
          />
        ) : (
          <ThemedText onPress={() => setTitleOnFocus(true)}>{title}</ThemedText>
        )}
        <View style={[styles.flex, {gap: 7}]}>
          <Button
            title="Remove"
            color={"#b93e51"}
            onPress={() => {}}
          />
          <Button
            title="Save"
            color={"#3eb951"}
            onPress={() => {}}
          />
          <Button
            title="Add Set"
            onPress={() => {
              setSets((prevSets) => [...prevSets, defaultSet]);
            }}
          />
        </View>
      </View>
      <View style={styles.flex}>
        <ThemedText style={styles.x}>set</ThemedText>
        <ThemedText style={styles.header}>Last</ThemedText>
        <ThemedText style={styles.header}>rep</ThemedText>
        <ThemedText style={styles.header}>weight</ThemedText>
        <ThemedText style={styles.x}></ThemedText>
      </View>
      <View>
        {sets.map((item, index) => (
          <ExerciseSetItem
            key={Math.random()}
            id={index}
            rep={item.rep}
            weight={item.weight}
            lastRep={5}
            lastWeight={10}
            onUpdate={updateSet}
            onDestroy={destroySet}
          />
        ))}
      </View>
    </View>
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
    width: "27%",
    textAlign: "center",
  },
  x: {
    width: "9.5%",
    textAlign: "center",
  },
  container: {
    // borderColor: "white",
    borderStyle: "solid",
    borderWidth: 1,
    borderBottomColor: "white",
    marginBottom: 20,
    padding: 5,
    paddingBottom: 10,
    backgroundColor: "#353535",
  },
});

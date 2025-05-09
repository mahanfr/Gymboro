import { useState } from "react";
import { Button, Text, TextInput, View, StyleSheet } from "react-native";
import ExerciseSetItem from "./ExerciseSetItem";
import { ThemedText } from "./ThemedText";
import { IExercise, ISet } from "@/data/Exercise";
import { ThemedView } from "./ThemedView";
import Svg, { Path } from "react-native-svg";

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
        <View style={[styles.flex, { gap: 7 }]}>
          {/* <Button title="Remove" color={"#b93e51"} onPress={() => {}} /> */}
          <X color={"#b93e51"} />
          {/* <Button title="Save" color={"#3eb951"} onPress={() => {}} /> */}
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
        {/* <Button
          title="Add Set"
          onPress={() => {
            setSets((prevSets) => [...prevSets, defaultSet]);
          }}
        /> */}
        <View style={[styles.flex, { justifyContent: "flex-end" }]}>
          <PlusCircleIcon
            onPress={() => {
              setSets((prevSets) => [...prevSets, defaultSet]);
            }}
            color={"#3eb951"}
          />
        </View>
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
    marginBottom: 20,
    padding: 5,
    paddingBottom: 10,
    // backgroundColor: "#353535",
  },
  textInput: {
    backgroundColor: "white",
    padding: 4,
  },
});
const X = ({ color }: { color: string }) => {
  return (
    <Svg fill="none" strokeWidth="1.5" width={30} height={30} viewBox="0 0 24 24" aria-hidden={true}>
      <Path stroke={color} strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"></Path>
    </Svg>
  );
};
const PlusCircleIcon = ({ color, onPress }: { color: string; onPress: () => void }) => {
  return (
    <Svg onPress={onPress} fill="none" strokeWidth={1.5} width={32} height={32} stroke="currentColor" viewBox="0 0 24 24" aria-hidden={true}>
      <Path stroke={color} strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </Svg>
  );
};

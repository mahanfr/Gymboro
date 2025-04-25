import { useState } from "react";
import { Button, Text, View } from "react-native";
import ExerciseSetItem from "./ExerciseSetItem";

export interface ISet {
  rep: number;
  weight: number;
} 

interface IProps {
    title: string,
    sets?: ISet[],
}

export default function ExerciseItem(props: IProps) {
    const defaultSet: ISet = {rep: 5, weight: 10}
    const [sets, setSets] = useState<ISet[]>(props.sets?  props.sets : [defaultSet])
    return (
      <View>
        <View style={{ flexDirection: "row", alignItems: "center" , justifyContent: "space-between"}}>
          <Text>{props.title}</Text>
          <Button
            title="Add Set"
            onPress={() => {
              setSets((prevSets) => [...prevSets, defaultSet]);
            }}
          />
        </View>
        <View >
            {sets.map((item, index) => 
                <ExerciseSetItem id={index} rep={item.rep} weight={item.weight} />
            )}
        </View>
      </View>
    );
}
import { useState } from "react";
import { Button } from "react-native";
import { Alert, StyleSheet, TextInput, View, Text } from 'react-native';

interface IProps {
    id: number,
    rep: number,
    weight: number, 
}

export default function ExerciseSetItem(props: IProps) {
   const [rep, setRep] = useState<number>(props.rep)
   const [weight, setWeight] = useState<number>(props.weight)
   return (
    <View style={{flexDirection:'row', alignItems:'center', justifyContent: "space-between"}}>
        <Text>Set {props.id + 1}</Text>
        <View style={{flexDirection:'row', alignItems:'center'}}>
          <Text>Rep: </Text>
          <Button title='+' color="#000" onPress={() => setRep(rep + 1)}/>
          <TextInput style={[styles.exerciseValueInput, {outline:'none'}]} 
            value={rep.toString()} 
            onChangeText={(text:string)=>{setRep(Number.parseInt(text))}}/>
          <Button title='-' color="#000" onPress={() => setRep(rep - 1)}/>
        </View>
        <View style={{flexDirection:'row', alignItems:'center'}}>
          <Text>Weight: </Text>
          <Button title='+' color="#000" onPress={() => setWeight(weight + 1)}/>
          <TextInput style={[styles.exerciseValueInput, {outline:'none'}]} 
            value={weight.toString() + 'kg'} 
            onChangeText={(text:string)=>{setWeight(Number.parseInt(text))}}/>
          <Button title='-' color="#000" onPress={() => setWeight(weight - 1)}/>
        </View>
    </View>
   ) 
}

const styles = StyleSheet.create({
  exerciseValueInput: {
    minHeight: 35,
    backgroundColor: "#fff",
    paddingInline: 2,
    width: 50,
    textAlign: "center",
    outline: 'none'
  },
});

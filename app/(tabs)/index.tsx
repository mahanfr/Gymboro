import { Alert, StyleSheet, TextInput } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from 'react-native';
import { useState } from 'react';
import ExerciseItem, { IExercise, ISet } from '@/components/ExerciseItem';

export default function HomeScreen() {
  const defaultSet: ISet = {rep: 5, weight: 10}
  const defaultExercise : IExercise = {title: "New Exercise", sets: [defaultSet]}
  const [exercises, setExercises] = useState<IExercise[]>([defaultExercise]);
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={<></>}>
      <ThemedView style={styles.stepContainer}>
        {exercises.map((ex, index) => 
          <ExerciseItem key={index} exercise={ex}/>       
        )}
        <Button 
          title='Add Exercise' 
          onPress={() => {
            setExercises((prevExercises) => [...prevExercises, defaultExercise])
          }} 
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  exerciseValueInput: {
    minHeight: 35,
    backgroundColor: "#fff",
    paddingInline: 2,
    width: 50,
    textAlign: "center",
    outline: 'none'
  },
});

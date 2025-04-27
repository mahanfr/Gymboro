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
      <ThemedView style={styles.card}>
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
  card: {
    gap: 8,
    backgroundColor: "#1e1e1e",
    padding: 18,
    marginBottom: 8,
  },
});

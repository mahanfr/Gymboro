import { Alert, StyleSheet, TextInput } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from 'react-native';
import { useState } from 'react';
import ExerciseItem from '@/components/ExerciseItem';

export default function HomeScreen() {
  const [exerciseValue, setExerciseValue] = useState<number>(0);
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={<></>}>
      <ThemedView style={styles.stepContainer}>
        <ThemedText>
          Edit to see changes.
        </ThemedText>
        <ExerciseItem title={'Bench Press'} />
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

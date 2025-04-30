import { StyleSheet, Image, Platform } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import MuscleBack from '@/components/MuscleBack';

export default function TabTwoScreen() {
  return (
      <ThemedView>
        <MuscleBack />
      </ThemedView>
  );
}

const styles = StyleSheet.create({
});

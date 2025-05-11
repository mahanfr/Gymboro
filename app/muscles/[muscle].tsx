import { Button, ScrollView, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";

export default function MuscleGroup() {
  const navigation: any = useNavigation();
  const { muscle } = useLocalSearchParams();

  useEffect(() => {
    navigation.setOptions({
      title: muscle || "Muscles",
    });
  }, [muscle]);

  return (
    <ScrollView>
      <SafeAreaProvider>
        <SafeAreaView>
          <View>
            <Button title="Bench Press" onPress={() => navigation.navigate("workouts/[id]", { id: 0 })} />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </ScrollView>
  );
}

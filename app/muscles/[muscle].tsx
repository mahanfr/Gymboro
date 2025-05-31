import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import ExerciseCard from "@/components/ExerciseCard";
import { useTranslation } from "react-i18next";
import * as SQLite from "expo-sqlite";

export default function MuscleGroup() {
  const navigation: any = useNavigation();
  const { muscle } = useLocalSearchParams();
  const [workouts, setWorkouts] = useState<any[]>();
  const { i18n } = useTranslation();
  const isEnglish = i18n.language === "en-US";

  const getData = async () => {
    const db = await SQLite.openDatabaseAsync("database.db");
    const wks = await db.getAllAsync("SELECT * FROM workout");
    setWorkouts(wks);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: muscle || "Muscles",
    });
  }, [muscle]);

  return (
    <ScrollView>
      <SafeAreaProvider>
        <SafeAreaView>
          {workouts?.map((workout, index) => (
            <View key={index}>
              <TouchableOpacity>
                <ExerciseCard
                  title={isEnglish ? workout.name : workout.name_fa}
                  key={index}
                  onPress={() => navigation.navigate("workouts/[id]", { id: 0 })}
                />
              </TouchableOpacity>
            </View>
          ))}
        </SafeAreaView>
      </SafeAreaProvider>
    </ScrollView>
  );
}

import { ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import ExerciseCard from "@/components/ExerciseCard";
import { useTranslation } from "react-i18next";
import * as SQLite from "expo-sqlite";
import images from "../../data/import_images";
import image_icons from "@/data/images_icon";

export default function MuscleGroup() {
  const navigation: any = useNavigation();
  const { muscle } = useLocalSearchParams();
  const [workouts, setWorkouts] = useState<any[]>();
  const { i18n } = useTranslation();
  const isEnglish = i18n.language === "en-US";
  const db = SQLite.useSQLiteContext();

  //SELECT * FROM your_table WHERE json_array_contains(your_column, 'Abs');
  const getData = async () => {
    const wks = await db.getAllAsync(`SELECT * FROM workout WHERE category LIKE '%"${muscle}"%';`);
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
      {workouts?.map((workout, index) => (
        <View key={index}>
          <TouchableOpacity>
            <ExerciseCard
              title={isEnglish ? workout.name : workout.name_fa}
              onPress={() => navigation.navigate("workouts/[id]", { id: workout.id })}
              image={image_icons[workout.image]}
              onDelete={() => {}}
            />
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

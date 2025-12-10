import { FlatList, ScrollView, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import ExerciseCard from "@/components/ExerciseCard";
import { useTranslation } from "react-i18next";
import * as SQLite from "expo-sqlite";
import images from "../../data/import_images";
import image_icons from "@/data/images_icon";
import { Image } from "react-native";

export default function MuscleGroup() {
  const navigation: any = useNavigation();
  const { muscle } = useLocalSearchParams();
  const [workouts, setWorkouts] = useState<any[]>();
  const { i18n } = useTranslation();
  const isEnglish = i18n.language === "en-US";
  const db = SQLite.useSQLiteContext();

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
    <FlatList
      data={workouts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ExerciseCard
          title={isEnglish ? item.name : item.name_fa}
          image={"move_icons/" + item.image}
          onDelete={() => {}}
          onPress={() => navigation.navigate("workouts/[id]", { id: item.id })}
        />
      )}
    />
  );
}

import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { Button, ScrollView } from "react-native";
import { useState, useRef } from "react";
import ExerciseItem from "@/components/ExerciseItem";
import { IExercise, ISet } from "@/data/Exercise";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import PopupManager, { usePopupManager } from "@/components/Popup";
import { MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import Routine from "@/app/Routine/Routine";
import RoutineView from "@/app/Routine/RoutineView";
import { useNavigation } from "expo-router";
import { ThemedText } from "@/components/ThemedText";

export default function HomeScreen() {
  const { popups, showPopup, hidePopup } = usePopupManager();
  const navigation: any = useNavigation();

  return (
    <ScrollView>
      <ThemedText type="subtitle">Routines:</ThemedText>
      <Routine
        onPress={() => {
          navigation.navigate("Routine/RoutineView");
        }}
      />
      <PopupManager popups={popups} onClose={hidePopup} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 8,
    padding: 4,
    marginBottom: 8,
  },
  size: {
    height: Dimensions.get("window").height - 50,
  },
});

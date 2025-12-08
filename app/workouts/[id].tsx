import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { View, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import { useEffect, useRef, useState } from "react";
import Svg, { Circle } from "react-native-svg";
import { useLocalSearchParams, useNavigation } from "expo-router";
import * as SQLite from "expo-sqlite";
import { useTranslation } from "react-i18next";
import images from "../../data/import_images";
import { MaterialIcons } from "@expo/vector-icons";
import PopupManager, { usePopupManager } from "@/components/Popup";

const { width, height } = Dimensions.get("window");

const WorkoutDetails = () => {
  const formatDescription = (text: string): string => {
    if (!text) return "";
    return text.replace(/\.\s*/g, ".\n").trimEnd();
  };
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();

  const { i18n, t } = useTranslation();
  const isEnglish = i18n.language === "en-US";

  const { popups, showPopup, hidePopup } = usePopupManager();

  const [workout, setWorkout] = useState<any>({
    id: 0,
    name: "Workout Details",
  });
  const [routine, setRoutine] = useState<Array<{ id: number; title: string }>>([
    {
      id: 0,
      title: "routine",
    },
  ]);
  const RoutineView = ({ routine }: { routine: Array<{ id: number; title: string }> }) => {
    return (
      <ScrollView>
        <ThemedView>
          {routine.map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                addToRoutine(item.id, Number(id));
                hidePopup("show_routine");
              }}
            >
              <ThemedText
                style={{
                  borderColor: "black",
                  borderWidth: 1,
                  width: 100,
                  marginBottom: 10,
                  textAlign: "center",
                  fontSize: 25,
                }}
                key={index}
              >
                {item.title}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ThemedView>
      </ScrollView>
    );
  };
  const handleShowPopup = () => {
    showPopup({
      popupKey: "show_routine",
      message: <RoutineView routine={routine} />,
      actions: [
        {
          style: { display: "none" },
          label: t("routine.close"),
          onPress: () => {
            hidePopup("show_routine");
          },
        },
      ],
    });
  };
  const getRoutines = async () => {
    const routine: { id: number; title: string }[] = await db.getAllAsync(`SELECT * FROM routine`);
    setRoutine(routine);
    return routine;
  };
  const addToRoutine = async (routine_id: number, workout_id: number) => {
    await db.runAsync(
      `INSERT INTO routine_workout (routine, workout) VALUES (${routine_id}, ${workout_id})`
    );
  };

  useEffect(() => {
    navigation.setOptions({
      title: workout.name || "Workout Details",
    });
  }, [workout.name]);

  const db = SQLite.useSQLiteContext();
  useEffect(() => {
    const getData = async () => {
      const wks = await db.getAllAsync(`SELECT * FROM workout WHERE id=${id}`);
      setWorkout(wks[0]);
    };
    getData();
  }, []);
  const [openRoutinePopup, setOpenRoutinePopup] = useState(false);
  useEffect(() => {
    if (openRoutinePopup) {
      handleShowPopup();
      setOpenRoutinePopup(false); // reset for next time
    }
  }, [routine]);
  return (
    <ScrollView>
      <PopupManager popups={popups} onClose={hidePopup} />
      <ThemedView style={{ padding: 6, paddingBottom: 10 }}>
        <TouchableOpacity
          style={{ display: "flex", flexDirection: "row" }}
          onPress={() => {
            getRoutines(); // loads routine into state
            setOpenRoutinePopup(true);
          }}
        >
          <ThemedText type="subtitle">{t("routine.Add")}</ThemedText>
          <MaterialIcons name={"add-circle"} color={"green"} size={28} />
        </TouchableOpacity>

        <View style={styles.wrapper}>
          <View style={styles.slide}>
            <Image style={styles.image} source={images[workout.image]} />
          </View>
        </View>

        <ThemedView style={{ padding: 6 }}>
          <ThemedText type="subtitle" style={{ textAlign: "center", padding: 5 }}>
            {isEnglish ? workout.name : workout.name_fa}
          </ThemedText>
          <ThemedText style={{ textAlign: isEnglish ? "left" : "right" }}>
            {formatDescription(isEnglish ? workout.description : workout.description_fa)}
          </ThemedText>
        </ThemedView>
        <ThemedText type="subtitle" style={{ textAlign: "center", padding: 5 }}>
          <ThemedText>{t(`workouts.index.instructions`)}</ThemedText>
        </ThemedText>
        <ThemedText style={{ textAlign: isEnglish ? "left" : "right" }}>
          {formatDescription(isEnglish ? workout.instructions : workout.instructions_fa)
            .split("\n")
            .map((line, index) => (
              <View key={index} style={{ marginBottom: 4 }}>
                <ThemedText key={index} style={{ direction: isEnglish ? "ltr" : "rtl" }}>
                  {index + 1}. {line} {"\n"}
                </ThemedText>
              </View>
            ))}
          {}
        </ThemedText>
      </ThemedView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: height * 0.5,
    position: "relative",
    marginBottom: 15,
  },
  scrollContent: {
    alignItems: "center",
  },
  slide: {
    width: width,
    height: height * 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  dotsContainer: {
    position: "absolute",
    bottom: -18,
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  border: {
    borderColor: "black",
    borderWidth: 2,
  },
});

export default WorkoutDetails;

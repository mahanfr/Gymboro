import { Image, TextInput, TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import PopupManager, { usePopupManager } from "@/components/Popup";
import { MaterialIcons } from "@expo/vector-icons";
import { Category, categories } from "@/data/DataTypes";
import { useTranslation } from "react-i18next";
import * as SQLite from "expo-sqlite";

interface IRoutineProps {
  id: number;
  title: string;
  numberOfMoves: number;
  involvedMuscles: Category[];
  onPress: () => void;
  onDelete: () => void;
}
const Routine = (props: IRoutineProps) => {
  const { popups, showPopup, hidePopup } = usePopupManager();
  const { i18n, t } = useTranslation();
  const isEnglish = i18n.language === "en-US";
  const db = SQLite.useSQLiteContext();
  async function deleteRoutine() {
    try {
      const dbRes = await db.runAsync("DELETE FROM routine WHERE id = ?", [props.id]);
    } catch (e) {
      console.error("Delete error:", e);
    }
  }

  const handleShowPopup = () => {
    showPopup({
      popupKey: "edit_popup",
      message: t("routine.want_delete"),
      actions: [
        {
          label: t("routine.delete"),
          style: { backgroundColor: "red" },
          onPress: () => {
            deleteRoutine();
            props.onDelete();
            hidePopup("edit_popup");
          },
        },
      ],
    });
  };
  return (
    <TouchableOpacity onPress={props.onPress}>
      <ThemedView
        style={{
          display: "flex",
          flexDirection: isEnglish ? "row" : "row-reverse",
          alignItems: "center",
          paddingHorizontal: 9,
          paddingVertical: 10,
          justifyContent: "space-between",
          borderTopWidth: 1,
        }}
      >
        <View>
          <ThemedText type="subtitle">{props.title}</ThemedText>
          <ThemedText style={{ color: "#969696" }}>
            {t("routine.total")} {props.numberOfMoves} {t("routine.moves")}
          </ThemedText>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: isEnglish ? "row" : "row-reverse",
            alignItems: "center",
          }}
        >
          {props.involvedMuscles.length > 1 ? (
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Image
                source={categories[props.involvedMuscles[0]]}
                style={{ width: 70, marginHorizontal: 2, height: 70 }}
              />
              <Image
                source={categories[props.involvedMuscles[1]]}
                style={{ width: 70, marginHorizontal: 2, height: 70 }}
              />
            </View>
          ) : (
            <Image
              source={categories[props.involvedMuscles[0]]}
              style={{ width: 70, marginHorizontal: 2, height: 70 }}
            />
          )}
          <TouchableOpacity
            // style={{ alignSelf: "center" }}
            // onPress={() => showPopup({ popupKey: "edit", message: "edit name or delete routine" })}
            onPress={handleShowPopup}
          >
            <MaterialIcons name="more-vert" color={"#969696"} size={28} />
            <PopupManager popups={popups} onClose={hidePopup} />
          </TouchableOpacity>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
};
export default Routine;

import { Image, TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import PopupManager, { usePopupManager } from "@/components/Popup";
import { MaterialIcons } from "@expo/vector-icons";
import { categories } from "@/data/DataTypes";
import { useTranslation } from "react-i18next";

interface IRoutineProps {
  title: string;
  numberOfMoves: number;
  involvedMuscles: [typeof categories];
  onPress: () => void;
}
const Routine = (props: IRoutineProps) => {
  const { popups, showPopup, hidePopup } = usePopupManager();
  const { i18n, t } = useTranslation();
  const isEnglish = i18n.language === "en-US";

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
          {/* TODO fix the images to correspond to  "involvedMuscles" */}
          <Image
            source={require("@/assets/images/muscle_groups/chest.png")}
            style={{ width: 70, marginHorizontal: 2, height: 70 }}
          />
          <Image
            source={require("@/assets/images/muscle_groups/core.png")}
            style={{ width: 70, marginHorizontal: 2, height: 70 }}
          />
          <TouchableOpacity
            // style={{ alignSelf: "center" }}
            onPress={() => showPopup({ popupKey: "edit", message: "edit name or delete routine" })}
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

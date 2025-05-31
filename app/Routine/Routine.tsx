import { Image, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../../components/ThemedText";
import { ThemedView } from "../../components/ThemedView";
import PopupManager, { usePopupManager } from "@/components/Popup";
import { MaterialIcons } from "@expo/vector-icons";

const Routine = ({ onPress }: { onPress: () => void }) => {
  const theWorkoutsIds = [0, 5, 12];
  const { popups, showPopup, hidePopup } = usePopupManager();
  return (
    <TouchableOpacity onPress={onPress}>
      <ThemedView
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 9,
          paddingVertical: 10,
          justifyContent: "space-between",
          borderTopWidth: 1,
        }}
      >
        <View>
          <ThemedText type="subtitle">Chester day</ThemedText>
          <ThemedText style={{ color: "#969696" }}>total of 4 moves</ThemedText>
        </View>
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../../assets/images/muscle_groups/chest.png")}
            style={{ width: 70, marginHorizontal: 2, height: 70 }}
          />
          <Image
            source={require("../../assets/images/muscle_groups/core.png")}
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

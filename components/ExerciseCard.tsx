import {
  View,
  Image,
  Text,
  ViewStyle,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { useContext } from "react";
import { Settings_createcontext } from "../app/_layout";
import { useTranslation } from "react-i18next";
import { MaterialIcons } from "@expo/vector-icons";

interface IProps {
  style?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[];
  title?: string;
  detail?: string;
  onPress?: () => void;
  onDelete: () => void;
  image?: string;
  editMode?: boolean;
}

const ExerciseCard: React.FC<IProps> = ({
  style,
  title,
  detail,
  onPress,
  onDelete,
  editMode = false,
  image = "muscle_groups/404.png",
}) => {
  const context = useContext(Settings_createcontext);
  const { i18n, t } = useTranslation();
  const isEnglish = i18n.language === "en-US";

  const { settings, setSettings } = context ?? {
    settings: { lightMode: true },
    setSettings: () => {},
  };
  let lightMode = settings.lightMode;

  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <ThemedView
        style={isEnglish ? styles.flexContainerEnglish : styles.flexContainerFarsi}
        lightMode={lightMode}
      >
        <View style={{ maxWidth: "70%" }}>
          <ThemedText type="subtitle" lightMode={lightMode}>
            {title}
          </ThemedText>
          <ThemedText type="detail">{detail}</ThemedText>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: isEnglish ? "row" : "row-reverse",
            alignItems: "center",
          }}
        >
          <ThemedView lightMode={lightMode} style={[styles.imageContainer]}>
            <Image style={styles.image} source={{ uri: image }} />
          </ThemedView>
          <TouchableOpacity
            onPress={() => onDelete()}
            style={{ display: editMode ? "flex" : "none" }}
          >
            <MaterialIcons name="delete" color={"red"} size={28} />
          </TouchableOpacity>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  flexContainerEnglish: {
    display: "flex",
    minHeight: 120,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: "100%",
    borderBottomWidth: 1,
  },
  flexContainerFarsi: {
    display: "flex",
    minHeight: 120,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: "100%",
    borderBottomWidth: 1,
  },

  imageContainer: {
    borderRadius: "100%",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 100,
    maxHeight: 100,
    backgroundColor: "white",
  },
  image: {
    maxWidth: 100,
    maxHeight: 100,
  },

  border: {
    borderColor: "white",
    borderWidth: 1,
  },
});

export default ExerciseCard;

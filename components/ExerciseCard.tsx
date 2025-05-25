import {
  View,
  Image,
  Text,
  ViewStyle,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { useContext } from "react";
import { Settings_createcontext } from "../app/_layout";
import { useTranslation } from "react-i18next";

interface IProps {
  style?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[];
  title?: string;
  detail?: string;
  onPress?: () => void;
  image?: NodeJS.Require;
}

const ExerciseCard: React.FC<IProps> = ({
  style,
  title,
  detail,
  onPress,
  image = require("../assets/images/muscle_groups/404.png"),
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
        <View>
          <ThemedText type="subtitle" lightMode={lightMode}>
            {title}
          </ThemedText>
          <ThemedText type="detail">{detail}</ThemedText>
        </View>
        <ThemedView lightMode={!lightMode} style={[styles.imageContainer]}>
          <Image style={styles.image} source={image} />
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  flexContainerEnglish: {
    display: "flex",
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

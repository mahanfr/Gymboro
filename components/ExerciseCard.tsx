import { View, Image, Text, ViewStyle, StyleProp, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { useContext } from "react";
import { Settings_createcontext } from "../app/_layout";

interface IProps {
  // isLightMode?: boolean;
  isEnglish?: boolean;
  style?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[];
  titleEnglish?: string;
  titleFarsi?: string;
  detailEnglish?: string;
  detailFarsi?: string;
  onPress: () => void;
  image: NodeJS.Require;
}

const ExerciseCard: React.FC<IProps> = ({
  // isLightMode = true,
  isEnglish = true,
  style,
  titleEnglish,
  titleFarsi,
  detailFarsi,
  detailEnglish,
  onPress,
  image = require("../assets/images/groups_icon/404.png"),
}) => {
  const context = useContext(Settings_createcontext);

  const { settings, setSettings } = context ?? { settings: { lightMode: true }, setSettings: () => {} };
  let lightMode = settings.lightMode;

  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <ThemedView style={isEnglish ? styles.flexContainerEnglish : styles.flexContainerFarsi} lightMode={lightMode}>
        <View>
          <ThemedText type="subtitle" lightMode={lightMode}>
            {isEnglish ? titleEnglish : titleFarsi}
          </ThemedText>
          <ThemedText type="detail">{isEnglish ? detailEnglish : detailFarsi}</ThemedText>
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

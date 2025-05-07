import { View, Image, Text, ViewStyle, StyleProp, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

type ExerciseCardProps = {
  isLightMode?: boolean;
  isEnglish?: boolean;
  style?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[];
  titleEnglish?: string;
  titleFarsi?: string;
  detailEnglish?: string;
  detailFarsi?: string;
  image: NodeJS.Require;
};
const ExerciseCard: React.FC<ExerciseCardProps> = ({
  isLightMode = true,
  isEnglish = true,
  style,
  titleEnglish,
  titleFarsi,
  detailFarsi,
  detailEnglish,
  image = require("../assets/images/groups_icon/404.png"),
}) => {
  return (
    <View style={style}>
      <ThemedView style={isEnglish ? styles.flexContainerEnglish : styles.flexContainerFarsi} lightMode={isLightMode}>
        <View>
          <ThemedText type="subtitle" lightMode={isLightMode}>
            {isEnglish ? titleEnglish : titleFarsi}
          </ThemedText>
          <ThemedText type="detail">{isEnglish ? detailEnglish : detailFarsi}</ThemedText>
        </View>
        <ThemedView lightMode={!isLightMode} style={[styles.imageContainer]}>
          <Image style={styles.image} source={image} />
        </ThemedView>
      </ThemedView>
    </View>
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

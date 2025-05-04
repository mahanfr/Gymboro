import { View, Image, Text, ViewStyle, StyleProp, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

let image_path = "../assets/images/groups_icon/";
type ExerciseCardProps = {
  isLightMode?: boolean;
  isEnglish?: boolean;
  style?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[];
  titleEnglish?: string;
  titleFarsi?: string;
  detailEnglish?: string;
  detailFarsi?: string;
  image?: string;
};
const ExerciseCard: React.FC<ExerciseCardProps> = ({
  isLightMode = true,
  isEnglish = true,
  style,
  titleEnglish,
  titleFarsi,
  detailFarsi,
  detailEnglish,
  image = "404.png",
}) => {
  let image_url = image_path + image;
  return (
    <View>
      <ThemedView style={isEnglish ? styles.flexContainerEnglish : styles.flexContainerFarsi} lightMode={isLightMode}>
        <View>
          <ThemedText type="subtitle" lightMode={isLightMode}>
            {isEnglish ? titleEnglish : titleFarsi}
          </ThemedText>
          <ThemedText type="detail">{isEnglish ? detailEnglish : detailFarsi}</ThemedText>
        </View>
        <ThemedView lightMode={!isLightMode} style={[styles.imageContainer]}>
          <Image style={styles.image} source={require(image_url)} />
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

import { View, Image, Text, ViewStyle, StyleProp, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

type ExerciseCardProps = {
  isLightMode?: boolean;
  isEnglish?: boolean;
  style?: StyleProp<ViewStyle> | StyleProp<ViewStyle>[];
};
const ExerciseCard: React.FC<ExerciseCardProps> = ({ isLightMode = true, isEnglish = true, style }) => {
  return (
    <View>
      <ThemedView style={[styles.flexContainer]} lightMode={false}>
        <View>
          <ThemedText type="subtitle" lightMode={false}>
            something
          </ThemedText>
          <ThemedText type="detail">something22222</ThemedText>
        </View>
        <ThemedView lightMode={true} /* the lightmode is opposit here*/ style={[styles.imageContainer]}>
          <Image style={styles.image} source={require("../assets/images/groups_icon/shoulders_icon.png")} />
        </ThemedView>
      </ThemedView>
      <ThemedView style={[styles.flexContainer]} lightMode={false}>
        <View>
          <ThemedText type="subtitle" lightMode={false}>
            something
          </ThemedText>
          <ThemedText type="detail">something22222</ThemedText>
        </View>
        <ThemedView lightMode={true} /* the lightmode is opposit here*/ style={[styles.imageContainer]}>
          <Image style={styles.image} source={require("../assets/images/groups_icon/shoulders_icon.png")} />
        </ThemedView>
      </ThemedView>
      <ThemedView style={[styles.flexContainer]} lightMode={true}>
        <View>
          <ThemedText type="subtitle" lightMode={true} /* the lightmode is opposit here*/>
            something
          </ThemedText>
          <ThemedText type="detail">something22222</ThemedText>
        </View>
        <ThemedView style={[styles.imageContainer]}>
          <Image style={styles.image} source={require("../assets/images/groups_icon/shoulders_icon.png")} />
        </ThemedView>
      </ThemedView>
      <ThemedView style={[styles.flexContainer]} lightMode={true}>
        <View>
          <ThemedText type="subtitle" lightMode={true} /* the lightmode is opposit here*/>
            something
          </ThemedText>
          <ThemedText type="detail">something22222</ThemedText>
        </View>
        <ThemedView style={[styles.imageContainer]}>
          <Image style={styles.image} source={require("../assets/images/groups_icon/shoulders_icon.png")} />
        </ThemedView>
      </ThemedView>
    </View>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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

import { Image, TouchableOpacity } from "react-native";
import { ThemedText } from "../../components/ThemedText";
import { ThemedView } from "../../components/ThemedView";

const Routine = () => {
  const theWorkoutsIds = [0, 5, 12];
  return (
    <TouchableOpacity>
      <ThemedView style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <ThemedText>routine day 1</ThemedText>
        <Image
          source={require("../../assets/images/muscle_groups/chest.png")}
          style={{ width: 50, height: 50 }}
        />
        <Image
          source={require("../../assets/images/muscle_groups/core.png")}
          style={{ width: 50, height: 50 }}
        />
      </ThemedView>
    </TouchableOpacity>
  );
};
export default Routine;

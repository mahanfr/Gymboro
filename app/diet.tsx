import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ScrollView } from "react-native";

export default function Diet() {
  return (
    <ScrollView>
      <ThemedView>
        <ThemedText type="subtitle">Just eat less 🤷‍♂️</ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

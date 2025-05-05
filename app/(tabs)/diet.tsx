import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Diet() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ThemedView>
          <ThemedText>Diet</ThemedText>
        </ThemedView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

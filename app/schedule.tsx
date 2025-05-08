import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Schedule() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ThemedView>
          <ThemedText>Schedule</ThemedText>
        </ThemedView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

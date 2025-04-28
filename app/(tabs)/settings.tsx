import { ThemedText } from "@/components/ThemedText";
import { Alert, StyleSheet, TextInput } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
export default function Settings() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ThemedText style={styles.text}>Setting</ThemedText>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  text: {
    // marginTop: 18,
    backgroundColor: "#1e1e1e",
    padding: 18,
    marginBottom: 8,
  },
});

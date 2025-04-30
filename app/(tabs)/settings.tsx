import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export interface ISettings {
  weightInc: string,
}

export default function Settings() {
  const [settings, setSettings] = useState<ISettings>({
      weightInc: "1.0"
  })
  const getLocalSettings = async () => {
    try {
      const value = await AsyncStorage.getItem('global-settings')
      if (value !== null) {
          setSettings(JSON.parse(value))
      }
    } catch (e) {
      console.log(e)
    }
  }

  const setLocalSettings = async () => {
    try {
      const jsonValue = JSON.stringify(settings);
      await AsyncStorage.setItem('global-settings', jsonValue);
    } catch (e) {
      console.log(e)
    }
  }
  
  useEffect(() => {
    getLocalSettings()
  },[])

  useEffect(() => {
    setLocalSettings()
  }, [settings])

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <ThemedView>
          <ThemedText>Weight Increment:</ThemedText>
          <TextInput 
            style={{backgroundColor: "#fff", padding: 4, outline: 'none'}}
            inputMode="decimal"
            keyboardType="decimal-pad"
            value={settings?.weightInc}
            onChangeText={(val) => setSettings({...settings, weightInc: val})}
          />
        </ThemedView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  text: {
    // marginTop: 18,
    backgroundColor: "#1e1e1e",
    padding: 18,
    marginBottom: 8,
  },
});

import { View, type ViewProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "../constants/Colors";
import { useContext } from "react";
import { Settings_createcontext } from "../app/_layout";

export type ThemedViewProps = ViewProps & {
  lightMode?: boolean | null;
};
// const Settings = createContext(null);
// export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
//   const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "background");

//   return <View style={[{ backgroundColor }, style]} {...otherProps} />;
// }
export function ThemedView({ style, lightMode = null, ...otherProps }: ThemedViewProps) {
  const context = useContext(Settings_createcontext);

  const { settings, setSettings } = context ?? { settings: { lightMode: true }, setSettings: () => {} };
  let islightMode = lightMode ?? settings.lightMode;

  const backgroundColor = islightMode ? Colors.light.background : Colors.dark.background;
  const borderColor = islightMode ? Colors.light.borderColor : Colors.dark.borderColor;
  const styles = StyleSheet.create({
    style: {
      backgroundColor: backgroundColor,
      borderColor: borderColor,
    },
  });

  return <View style={[styles.style, style]} {...otherProps} />;
}

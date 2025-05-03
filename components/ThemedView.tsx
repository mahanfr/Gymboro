import { View, type ViewProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "../constants/Colors";

export type ThemedViewProps = ViewProps & {
  lightMode?: boolean;
};

// export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
//   const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "background");

//   return <View style={[{ backgroundColor }, style]} {...otherProps} />;
// }
export function ThemedView({ style, lightMode = true, ...otherProps }: ThemedViewProps) {
  const backgroundColor = lightMode ? Colors.light.background : Colors.dark.background;
  const borderColor = lightMode ? Colors.light.borderColor : Colors.dark.borderColor;
  const styles = StyleSheet.create({
    style: {
      backgroundColor: backgroundColor,
      borderColor: borderColor,
    },
  });

  return <View style={[styles.style, style]} {...otherProps} />;
}

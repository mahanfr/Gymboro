import { Text, type TextProps, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";

// export type ThemedTextProps = TextProps & {
//   lightColor?: string;
//   darkColor?: string;
//   type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link" | "detail";
// };
export type ThemedTextProps = TextProps & {
  lightMode?: boolean;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link" | "detail";
};
export function ThemedText({ style, lightMode = true, type = "default", ...rest }: ThemedTextProps) {
  // const color = useThemeColor({ light: lightColor, dark: darkColor },);
  const color = lightMode ? Colors.light.color : Colors.dark.color;

  return (
    <Text
      style={[
        { color: color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "detail" ? styles.detail : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
  detail: {
    lineHeight: 20,
    fontSize: 12,
    color: "gray",
  },
});

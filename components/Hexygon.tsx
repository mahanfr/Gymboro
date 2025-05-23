import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Svg, { Polygon, Circle, Text, Line } from "react-native-svg";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { useContext } from "react";
import { Settings_createcontext } from "../app/_layout";

interface HexygonProps {
  data: {
    _1day?: number[];
    _1week?: number[];
    _1month?: number[];
    _3months?: number[];
    _1year?: number[];
    all?: number[];
  };
}

const Hexygon: React.FC<HexygonProps> = ({ data }) => {
  const context = useContext(Settings_createcontext);
  const { settings, setSettings } = context ?? { settings: { lightMode: true }, setSettings: () => {} };
  let lightMode = settings.lightMode;

  const [selectedDateRange, setSelectedDateRange] = useState(0);
  const [values, setValues] = useState<number[]>([0, 0, 0, 0, 0, 0]); // Default to 6 values

  // Move the data validation inside useEffect
  useEffect(() => {
    switch (selectedDateRange) {
      case 0:
        setValues(data._1day && data._1day.length === 6 ? data._1day : [0, 0, 0, 0, 0, 0]);
        break;
      case 1:
        setValues(data._1week && data._1week.length === 6 ? data._1week : [0, 0, 0, 0, 0, 0]);
        break;
      case 2:
        setValues(data._1month && data._1month.length === 6 ? data._1month : [0, 0, 0, 0, 0, 0]);
        break;
      case 3:
        setValues(data._3months && data._3months.length === 6 ? data._3months : [0, 0, 0, 0, 0, 0]);
        break;
      case 4:
        setValues(data._1year && data._1year.length === 6 ? data._1year : [0, 0, 0, 0, 0, 0]);
        break;
      case 5:
        setValues(data.all && data.all.length === 6 ? data.all : [0, 0, 0, 0, 0, 0]);
        break;
      default:
        setValues([0, 0, 0, 0, 0, 0]);
    }
  }, [selectedDateRange, data]);

  // Normalize values to 1-10 range
  const normalizedValues = values.map((val) => Math.min(10, Math.max(1, val)));

  // Chart configuration
  const size = Dimensions.get("window").width * 0.8; // Chart size
  const center = size / 2;
  const radius = size / 2 - 30;
  const labels = ["Chest", "Core", "Arms", "Shoulders", "Legs", "Back"];

  // Calculate points for the hexagon
  const getPoints = (values: number[], scale: number = 1): string => {
    return values
      .map((value: number, i: number): string => {
        const angle: number = (Math.PI / 3) * i - Math.PI / 2; // Offset by -90deg to start at top
        const scaledRadius: number = (radius * scale * value) / 10;
        const x: number = center + scaledRadius * Math.cos(angle);
        const y: number = center + scaledRadius * Math.sin(angle);
        return `${x},${y}`;
      })
      .join(" ");
  };

  // Calculate points for the labels
  const getLabelPosition = (index: number) => {
    const angle = (Math.PI / 3) * index - Math.PI / 2;
    const x = center + (radius + 20) * Math.cos(angle);
    const y = center + (radius + 20) * Math.sin(angle);
    return { x, y, angle };
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.dateSelector}>
          {["1D", "1W", "1M", "3M", "1Y", "All"].map((label, index) => (
            <ThemedText
              key={index}
              lightMode={!lightMode}
              style={[styles.dates, selectedDateRange === index && { backgroundColor: lightMode ? "#ddd" : "#555" }]}
              onPress={() => setSelectedDateRange(index)}
            >
              {label}
            </ThemedText>
          ))}
        </View>
      </View>
      <Svg width={size} height={size}>
        {/* Background hexagon grid */}
        {[1, 0.75, 0.5, 0.25].map((scale, i) => (
          <Polygon key={i} points={getPoints([10, 10, 10, 10, 10, 10], scale)} fill="none" stroke="#ddd" strokeWidth="1" />
        ))}

        {/* Axis lines */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (Math.PI / 3) * i - Math.PI / 2;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          return <Line key={i} x1={center} y1={center} x2={x} y2={y} stroke="#ddd" strokeWidth="1" />;
        })}

        {/* Filled hexagon */}
        <Polygon points={getPoints(normalizedValues)} fill="rgba(100, 150, 255, 0.5)" stroke="rgba(50, 100, 255, 0.8)" strokeWidth="2" />

        {/* Labels */}
        {labels.map((label, i) => {
          const pos = getLabelPosition(i);
          return (
            <Text key={i} x={pos.x} y={pos.y} fill="#333" fontSize="12" textAnchor="middle" alignmentBaseline="middle">
              {label}
            </Text>
          );
        })}

        {/* Value indicators */}
        {normalizedValues.map((value, i) => {
          const angle = (Math.PI / 3) * i - Math.PI / 2;
          const x = center + ((radius * value) / 10) * Math.cos(angle);
          const y = center + ((radius * value) / 10) * Math.sin(angle);
          return (
            <React.Fragment key={i}>
              <Circle cx={x} cy={y} r="4" fill="rgba(50, 100, 255, 0.8)" />
              <Text x={x} y={y - 10} fill="#333" fontSize="10" textAnchor="middle">
                {value}
              </Text>
            </React.Fragment>
          );
        })}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  dateSelector: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  dates: {
    paddingHorizontal: 5,
    paddingVertical: 3,
    textAlign: "center",
    borderRadius: 20,
    width: 50,
    marginHorizontal: 2,
  },
});

export default Hexygon;

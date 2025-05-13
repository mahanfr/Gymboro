import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

interface GityChart {
  data?: number[][]; // Array of weeks, each containing 7 days
  colors?: string[]; // Array of color strings
}

const GitHubActivityChart: React.FC<GityChart> = ({ data, colors }) => {
  // Default data structure: array of weeks, each containing 7 days (0 = no activity, 4 = max)
  const defaultData = Array(52)
    .fill(0)
    .map(() =>
      Array(7)
        .fill(0)
        .map(() => Math.floor(Math.random() * 5))
    );
  const activityData = data || defaultData;

  // Default colors from light to dark
  const defaultColors = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
  const colorPalette = colors || defaultColors;

  const squareSize = (Dimensions.get("window").width - 40) / 52; // 52 weeks, 20px padding each side
  const maxSquareSize = 12; // Don't let squares get too big on tablets

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        {activityData.map((week, weekIndex) => (
          <View key={`week-${weekIndex}`} style={styles.weekColumn}>
            {week.map((dayValue, dayIndex) => (
              <View
                key={`day-${weekIndex}-${dayIndex}`}
                style={[
                  styles.daySquare,
                  {
                    backgroundColor: colorPalette[dayValue] || colorPalette[0],
                    width: Math.min(squareSize, maxSquareSize),
                    height: Math.min(squareSize, maxSquareSize),
                    margin: 1,
                  },
                ]}
              />
            ))}
          </View>
        ))}
      </View>

      <View style={styles.legend}>
        <Text style={styles.legendText}>Less</Text>
        {colorPalette.map((color, index) => (
          <View key={`legend-${index}`} style={[styles.legendSquare, { backgroundColor: color }]} />
        ))}
        <Text style={styles.legendText}>More</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  chartContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  weekColumn: {
    flexDirection: "column",
  },
  daySquare: {
    borderRadius: 2,
  },
  legend: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  legendSquare: {
    width: 12,
    height: 12,
    borderRadius: 2,
    marginHorizontal: 2,
  },
  legendText: {
    fontSize: 12,
    color: "#586069",
    marginHorizontal: 4,
  },
});

export default GitHubActivityChart;

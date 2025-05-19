import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from "react-native";

interface GitChart {
  initialYear?: number;
  data?: { [year: number]: number[] }; // Year-indexed data
  colors?: string[]; // Array of color strings
}

const GitHubActivityChart: React.FC<GitChart> = ({ initialYear = new Date().getFullYear(), data, colors }) => {
  const [currentYear, setCurrentYear] = useState(initialYear);

  // Check if year is leap year
  const isLeapYear = (year: number) => (year + 1) % 4 === 0;
  const daysInYear = isLeapYear(currentYear) ? 366 : 365;

  // Get first day of year (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfYear = new Date(currentYear, 0, 1).getDay();
  // Adjust so Monday is first day of week (GitHub style)
  const firstDayOffset = (firstDayOfYear + 6) % 7;

  // Get data for current year or generate random data
  const yearData =
    data?.[currentYear] ||
    Array(daysInYear)
      .fill(0)
      .map(() => Math.floor(Math.random() * 5));

  // Default colors similar to GitHub
  const defaultColors = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
  const colorPalette = colors || defaultColors;

  // Calculate chart dimensions
  const squareSize = 12;
  const squareMargin = 2;
  const squaresPerRow = 7;
  const totalWeeks = Math.ceil((firstDayOffset + daysInYear) / 7);
  const chartWidth = totalWeeks * (squareSize + squareMargin * 2);

  // Group data into weeks
  const weeks: number[][] = [];
  let currentWeek: number[] = [];

  // Add empty squares for first week offset
  for (let i = 0; i < firstDayOffset; i++) {
    currentWeek.push(-1); // -1 means empty/inactive square
  }

  // Fill with actual data
  for (let day = 0; day < daysInYear; day++) {
    currentWeek.push(yearData[day]);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  // Add remaining days to last week
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(-1);
    }
    weeks.push(currentWeek);
  }

  const handlePrevYear = () => setCurrentYear((prev) => prev - 1);
  const handleNextYear = () => setCurrentYear((prev) => prev + 1);

  return (
    <View style={styles.container}>
      <View style={styles.yearNavigation}>
        <TouchableOpacity onPress={handlePrevYear} style={styles.navButton}>
          <Text style={styles.navButtonText}>{"<"}</Text>
        </TouchableOpacity>

        <Text style={styles.yearText}>{currentYear}</Text>

        <TouchableOpacity onPress={handleNextYear} style={styles.navButton}>
          <Text style={styles.navButtonText}>{">"}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.chartContainer, { width: chartWidth }]}>
          {weeks.map((week, weekIndex) => (
            <View key={`week-${weekIndex}`} style={styles.weekColumn}>
              {week.map((dayValue, dayIndex) => (
                <View
                  key={`day-${weekIndex}-${dayIndex}`}
                  style={[
                    styles.daySquare,
                    {
                      backgroundColor: dayValue === -1 ? "transparent" : colorPalette[dayValue],
                      width: squareSize,
                      height: squareSize,
                      margin: squareMargin,
                    },
                  ]}
                />
              ))}
            </View>
          ))}
        </View>
      </ScrollView>

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
  yearNavigation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  navButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 4,
    backgroundColor: "#f0f0f0",
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  yearText: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 15,
    minWidth: 80,
    textAlign: "center",
  },
  scrollContainer: {
    paddingVertical: 5,
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
    marginTop: 10,
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

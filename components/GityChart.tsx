import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

interface GitChart {
  data: { [year: number]: number[] }; // Year-indexed data with day indices (0-based)
  initialYear?: number; // Optional starting year (defaults to first year in data)
}

const GitHubActivityChart: React.FC<GitChart> = ({ data, initialYear }) => {
  // Get all available years from data
  const availableYears = Object.keys(data).map(Number).sort();
  const firstYear = availableYears[0];
  const lastYear = availableYears[availableYears.length - 1];

  // Set current year to initialYear if provided and exists in data, otherwise first available year
  const [currentYear, setCurrentYear] = useState(initialYear && data[initialYear] ? initialYear : firstYear);

  // Check if year is leap year
  const isLeapYear = (year: number) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const daysInYear = isLeapYear(currentYear) ? 366 : 365;

  // Get first day of year (0 = Sunday, 1 = Monday, etc.)
  const firstDayOfYear = new Date(currentYear, 0, 1).getDay();
  // Adjust so Monday is first day of week (GitHub style)
  const firstDayOffset = (firstDayOfYear + 6) % 7;

  // Get data for current year
  const activeDays = data[currentYear] || [];
  const activeDaysSet = new Set(activeDays);

  // Calculate chart dimensions
  const squareSize = 12;
  const squareMargin = 2;
  const totalWeeks = Math.ceil((firstDayOffset + daysInYear) / 7);
  const chartWidth = totalWeeks * (squareSize + squareMargin * 2);

  // Group data into weeks
  const weeks: number[][] = [];
  let currentWeek: number[] = [];

  // Add empty squares for first week offset
  for (let i = 0; i < firstDayOffset; i++) {
    currentWeek.push(-1); // -1 means empty/inactive square
  }

  // Fill with actual data (0 = inactive, 1 = active)
  for (let day = 0; day < daysInYear; day++) {
    currentWeek.push(activeDaysSet.has(day) ? 1 : 0);
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

  const handlePrevYear = () => {
    const currentIndex = availableYears.indexOf(currentYear);
    if (currentIndex > 0) {
      setCurrentYear(availableYears[currentIndex - 1]);
    }
  };

  const handleNextYear = () => {
    const currentIndex = availableYears.indexOf(currentYear);
    if (currentIndex < availableYears.length - 1) {
      setCurrentYear(availableYears[currentIndex + 1]);
    }
  };

  const hasPrevYear = availableYears.indexOf(currentYear) > 0;
  const hasNextYear = availableYears.indexOf(currentYear) < availableYears.length - 1;

  return (
    <View style={styles.container}>
      <View style={styles.yearNavigation}>
        <TouchableOpacity onPress={hasPrevYear ? handlePrevYear : () => {}} style={styles.navButton}>
          <Text style={styles.navButtonText}>{"<"}</Text>
        </TouchableOpacity>

        <Text style={styles.yearText}>{currentYear}</Text>

        <TouchableOpacity onPress={hasNextYear ? handleNextYear : () => {}} style={styles.navButton}>
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
                      backgroundColor: dayValue === -1 ? "transparent" : dayValue === 1 ? "#40c463" : "#ebedf0",
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
});

export default GitHubActivityChart;

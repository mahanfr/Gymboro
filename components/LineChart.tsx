import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Svg, { Line, Path, G, Text as SvgText, Circle } from "react-native-svg";

const LineChart = () => {
  // Months data
  const months = [
    { name: "فروردین", days: 31 },
    { name: "اردیبهشت", days: 31 },
    { name: "خرداد", days: 31 },
    { name: "تیر", days: 31 },
    { name: "مرداد", days: 31 },
    { name: "شهریور", days: 31 },
    { name: "مهر", days: 30 },
    { name: "آبان", days: 30 },
    { name: "آذر", days: 30 },
    { name: "دی", days: 30 },
    { name: "بهمن", days: 30 },
    { name: "اسفند", days: 29 },
  ];
  // Sample data - one month's worth of values (30 days)
  const generateData = () => {
    return Array.from({ length: 31 }, (_, i) => Math.floor(Math.random() * 100) + 1);
  };

  const [currentMonth, setCurrentMonth] = useState(0);
  const [data, setData] = useState(generateData());

  const handlePrev = () => {
    setCurrentMonth((prev) => (prev > 0 ? prev - 1 : months.length - 1));
    setData(generateData());
  };

  const handleNext = () => {
    setCurrentMonth((prev) => (prev < months.length - 1 ? prev + 1 : 0));
    setData(generateData());
  };

  // Chart dimensions
  const chartWidth = 31 * 50; // 30 days * 50px per day
  const chartHeight = 200;
  const padding = 20;
  const yAxisWidth = 40; // Width for y-axis and labels

  // Calculate Y position for a data point
  const getY = (value: number) => {
    return chartHeight - padding - (value / 100) * (chartHeight - padding * 2);
  };

  // Generate path for the line - now matches circle positions
  const createPath = () => {
    let path = `M 0 ${getY(data[0])}`; // Start at x=0 instead of x=padding
    for (let i = 1; i < data.length; i++) {
      path += ` L ${i * 50} ${getY(data[i])}`; // Remove padding from x calculation
    }
    return path;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handlePrev} style={styles.button}>
          <Text>Previous</Text>
        </TouchableOpacity>

        <View style={styles.monthContainer}>
          <Text style={styles.monthText}>{months[currentMonth].name}</Text>
        </View>

        <TouchableOpacity onPress={handleNext} style={styles.button}>
          <Text>Next</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.chartContainer}>
        {/* Fixed Y-axis */}
        <View style={styles.yAxisContainer}>
          <Svg width={yAxisWidth} height={chartHeight}>
            {/* Y axis line */}
            <Line x1={yAxisWidth - 10} y1={padding} x2={yAxisWidth - 10} y2={chartHeight - padding} stroke="black" strokeWidth="1" />

            {/* Y axis labels */}
            <G>
              {[0, 25, 50, 75, 100].map((value) => (
                <G key={`label-${value}`}>
                  <Line x1={yAxisWidth - 15} y1={getY(value)} x2={yAxisWidth - 10} y2={getY(value)} stroke="black" strokeWidth="1" />
                  <SvgText x={yAxisWidth - 20} y={getY(value) + 4} fontSize="10" textAnchor="end" fill="black">
                    {value}
                  </SvgText>
                </G>
              ))}
            </G>
          </Svg>
        </View>

        {/* Scrollable chart content */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <Svg width={chartWidth} height={chartHeight} style={{ overflow: "visible" }}>
            {/* Horizontal grid lines */}
            <G>
              {[0, 25, 50, 75, 100].map((value) => (
                <Line key={`grid-${value}`} x1={0} y1={getY(value)} x2={chartWidth} y2={getY(value)} stroke="#e0e0e0" strokeWidth="1" strokeDasharray="5,5" />
              ))}
            </G>

            {/* X axis */}
            <Line x1={0} y1={chartHeight - padding} x2={chartWidth} y2={chartHeight - padding} stroke="black" strokeWidth="1" />

            {/* X axis labels (days) */}
            <G>
              {Array.from({ length: 31 }, () => 0).map((_, i) => (
                <G key={`day-${i}`}>
                  <Line x1={i * 50} y1={chartHeight - padding} x2={i * 50} y2={chartHeight - padding + 5} stroke="black" strokeWidth="1" />
                  <SvgText x={i * 50} y={chartHeight - padding + 20} fontSize="10" textAnchor="middle" fill="black">
                    {i + 1}
                  </SvgText>
                </G>
              ))}
            </G>

            {/* Data line - now properly aligned with dots */}
            <Path d={createPath()} fill="none" stroke="blue" strokeWidth="2" />

            {/* Data points */}
            {data.map((value, i) => (
              <Circle key={`point-${i}`} cx={i * 50} cy={getY(value)} r={5} fill={"blue"} />
            ))}
          </Svg>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  button: {
    padding: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  monthContainer: {
    alignItems: "center",
  },
  monthText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  chartContainer: {
    flexDirection: "row",
    height: 200,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  yAxisContainer: {
    width: 40, // Fixed width for y-axis
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingLeft: 10, // Add some padding to separate from y-axis
  },
});

export default LineChart;

import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Svg, { Line, Path, G, Text as SvgText, Circle } from "react-native-svg";

const LineChart = () => {
  // Sample data - one month's worth of values (30 days)
  const generateData = () => {
    // return [0, 0, 0, 0, 10, 10, 20];
    return Array.from({ length: 30 }, (_, i) => Math.floor(Math.random() * 100) + 1);
  };

  // Months data
  const months = [
    { en: "January", fa: "ژانویه" },
    { en: "February", fa: "فوریه" },
    { en: "March", fa: "مارس" },
    { en: "April", fa: "آوریل" },
    { en: "May", fa: "مه" },
    { en: "June", fa: "ژوئن" },
  ];

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
  const chartWidth = 30 * 50; // 30 days * 50px per day
  const chartHeight = 200;
  const padding = 20;

  // Calculate Y position for a data point
  const getY = (value: number) => {
    return chartHeight - padding - (value / 100) * (chartHeight - padding * 2);
  };

  // Generate path for the line
  const createPath = () => {
    let path = `M ${padding} ${getY(data[0])}`;
    for (let i = 1; i < data.length; i++) {
      path += ` L ${padding + i * 50} ${getY(data[i])}`;
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
          <Text style={styles.monthText}>{months[currentMonth].en}</Text>
          <Text style={styles.monthText}>{months[currentMonth].fa}</Text>
        </View>

        <TouchableOpacity onPress={handleNext} style={styles.button}>
          <Text>Next</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Svg width={chartWidth} height={chartHeight} style={styles.chart}>
          {/* Y axis */}
          <Line x1={padding} y1={padding} x2={padding} y2={chartHeight - padding} stroke="black" strokeWidth="1" />

          {/* X axis */}
          <Line x1={padding} y1={chartHeight - padding} x2={chartWidth} y2={chartHeight - padding} stroke="black" strokeWidth="1" />

          {/* Y axis labels */}
          <G>
            {[0, 25, 50, 75, 100].map((value) => (
              <G key={value}>
                <Line x1={padding - 5} y1={getY(value)} x2={padding} y2={getY(value)} stroke="black" strokeWidth="1" />
                <SvgText x={padding - 10} y={getY(value) + 4} fontSize="10" textAnchor="end" fill="black">
                  {value}
                </SvgText>
              </G>
            ))}
          </G>

          {/* X axis labels (days) */}
          <G>
            {/*TODO some months are 30 and some are 31 days*/}
            {Array.from({ length: 30 }, () => 0).map((_, i) => (
              <G key={i}>
                <Line x1={padding + i * 50} y1={chartHeight - padding} x2={padding + i * 50} y2={chartHeight - padding + 5} stroke="black" strokeWidth="1" />
                <SvgText x={padding + i * 50} y={chartHeight - padding + 20} fontSize="10" textAnchor="middle" fill="black">
                  {i + 1}
                </SvgText>
              </G>
            ))}
          </G>

          {/* Data line */}
          <Path d={createPath()} fill="none" stroke="blue" strokeWidth="2" />

          {/* Data points */}
          {data.map((value, i) => (
            <Circle cx={padding + i * 50} cy={getY(value)} r={5} fill={"blue"} />
          ))}
        </Svg>
      </ScrollView>
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
  },
  chart: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
});

export default LineChart;

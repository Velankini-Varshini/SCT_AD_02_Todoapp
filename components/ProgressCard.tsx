import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

interface Props {
  total: number;
  completed: number;
}

export default function ProgressCard({
  total,
  completed,
}: Props) {
  const percentage =
    total === 0
      ? 0
      : Math.round((completed / total) * 100);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        Progress
      </Text>

      <Text style={styles.info}>
        {completed} of {total} tasks completed
      </Text>

      <View style={styles.barBackground}>
        <View
          style={[
            styles.barFill,
            {
              width: `${percentage}%`,
            },
          ]}
        />
      </View>

      <Text style={styles.percent}>
        {percentage}%
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    elevation: 3,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  info: {
    color: "#666",
    marginBottom: 15,
  },

  barBackground: {
    height: 10,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    overflow: "hidden",
  },

  barFill: {
    height: "100%",
    backgroundColor: "#5B67CA",
  },

  percent: {
    marginTop: 10,
    fontWeight: "bold",
    color: "#5B67CA",
  },
});
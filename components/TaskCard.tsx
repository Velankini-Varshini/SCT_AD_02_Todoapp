import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Task } from "../types/Task";

interface Props {
  task: Task;
  theme: "light" | "dark";
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

export default function TaskCard({
  task,
  theme,
  onToggle,
  onDelete,
  onEdit,
}: Props) {
  const priorityColor =
    task.priority === "High"
      ? "#FF4D4D"
      : task.priority === "Medium"
      ? "#FFA500"
      : "#4CAF50";

  return (
    <View style={[styles.card, theme === "dark" ? styles.cardDark : styles.cardLight]}>
      <TouchableOpacity onPress={onToggle}>
        <Ionicons
          name={
            task.completed
              ? "checkbox"
              : "square-outline"
          }
          size={28}
          color="#5B67CA"
        />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            task.completed && styles.completed,
            theme === "dark" && styles.titleDark,
          ]}
        >
          {task.title}
        </Text>

        <Text
          style={[
            styles.date,
            task.completed && styles.completed,
            theme === "dark" && styles.dateDark,
          ]}
        >
          {task.date}
        </Text>

        <View
          style={[
            styles.priorityBadge,
            {
              backgroundColor: priorityColor,
            },
          ]}
        >
          <Text style={styles.priorityText}>
            {task.priority}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          onPress={onEdit}
          style={styles.editButton}
        >
          <Ionicons
            name="create-outline"
            size={24}
            color="blue"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={onDelete}>
          <Ionicons
            name="trash"
            size={24}
            color="red"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardLight: {
    backgroundColor: "white",
  },

  cardDark: {
    backgroundColor: "#1E1E1E",
  },

  card: {
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  content: {
    flex: 1,
    marginLeft: 15,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
  },

  titleDark: {
    color: "#FFFFFF",
  },

  date: {
    marginTop: 4,
    color: "#666",
    fontSize: 13,
  },

  dateDark: {
    color: "#B3B3B3",
  },


  completed: {
    textDecorationLine: "line-through",
    color: "#999",
  },

  priorityBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginTop: 8,
  },

  priorityText: {
    color: "white",
    fontWeight: "600",
  },

  actions: {
    flexDirection: "row",
  },

  editButton: {
    marginRight: 15,
  },
});
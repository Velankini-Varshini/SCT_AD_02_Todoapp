import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { Task } from "./types/Task";
import { saveTasks, loadTasks } from "./utils/storage";

import TaskCard from "./components/TaskCard";
import FilterButton from "./components/FilterButton";
import { DarkColors, LightColors } from "./constants/Colors";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskText, setTaskText] = useState("");
  const [dateText, setDateText] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [priority, setPriority] = useState<
    "High" | "Medium" | "Low"
  >("Medium");
  const [search, setSearch] = useState("");

  // Load tasks
  useEffect(() => {
    const fetchTasks = async () => {
      const storedTasks = await loadTasks();

      // Backwards-compatible: older tasks might not have `date`
      const normalized: Task[] = storedTasks.map((t: any) => ({
        ...t,
        date: typeof t?.date === "string" && t.date.length > 0 ? t.date : "" + new Date().toISOString().slice(0, 10),
      }));

      setTasks(normalized);
    };

    fetchTasks();
  }, []);

  // Save tasks
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  // Add or Update Task
  const addTask = () => {
    if (!taskText.trim()) return;

    const finalDate = dateText?.trim().length ? dateText.trim() : new Date().toISOString().slice(0, 10);

    if (editingId) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editingId
            ? {
                ...task,
                title: taskText,
                priority,
                date: finalDate,
              }
            : task
        )
      );

      setEditingId(null);
    } else {
      const newTask: Task = {
        id: Date.now().toString(),
        title: taskText,
        completed: false,
        priority,
        date: finalDate,
      };

      setTasks((prev) => [...prev, newTask]);
    }

    setTaskText("");
    setDateText("");
    setPriority("Medium");
  };

  // Edit task
  const editTask = (task: Task) => {
    setTaskText(task.title);
    setPriority(task.priority);
    setDateText(task.date || "");
    setEditingId(task.id);
  };

  // Delete task
  const deleteTask = (id: string) => {
    setTasks((prev) =>
      prev.filter((task) => task.id !== id)
    );
  };

  // Toggle completed
  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  };
  const filteredTasks = tasks.filter((task) =>
  task.title
    .toLowerCase()
    .includes(search.toLowerCase())
);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={
        Platform.OS === "ios" ? "padding" : "height"
      }
    >
      <View style={[styles.container, theme === "dark" ? styles.containerDark : null]}>
        <View style={styles.headerRow}>
          <Text style={[styles.header, theme === "dark" ? styles.headerDark : null]}>My Tasks</Text>

          <TouchableOpacity
            onPress={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
            style={[styles.themeToggle, theme === "dark" ? styles.themeToggleDark : null]}
          >
            <Text style={styles.themeToggleText}>
              {theme === "light" ? "Dark" : "Light"}
            </Text>
          </TouchableOpacity>
        </View>
        
        

        <View style={styles.priorityContainer}>
          <FilterButton
            title="High"
            active={priority === "High"}
            onPress={() => setPriority("High")}
          />

          <FilterButton
            title="Medium"
            active={priority === "Medium"}
            onPress={() => setPriority("Medium")}
          />

          <FilterButton
            title="Low"
            active={priority === "Low"}
            onPress={() => setPriority("Low")}
          />
        </View>

        <View style={styles.addContainer}>
          <TextInput
            placeholder="Add a new task..."
            style={[styles.input, theme === "dark" ? styles.inputDark : null]}
            value={taskText}
            onChangeText={setTaskText}
          />

          <TouchableOpacity
            style={styles.addButton}
            onPress={addTask}
          >
            <Text style={styles.addText}>
              {editingId ? "Update" : "Add"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dateContainer}>
          <Text style={[styles.dateLabel, theme === "dark" ? styles.dateLabelDark : null]}>Date</Text>
          <TextInput
            placeholder="YYYY-MM-DD"
            style={[styles.dateInput, theme === "dark" ? styles.dateInputDark : null]}
            value={dateText}
            onChangeText={setDateText}
          />
        </View>

        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskCard
              task={item}
              theme={theme}
              onToggle={() => toggleTask(item.id)}
              onDelete={() => deleteTask(item.id)}
              onEdit={() => editTask(item)}
            />
          )}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LightColors.background,
    padding: 20,
    paddingTop: 60,
  },

  containerDark: {
    backgroundColor: DarkColors.background,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  header: {
    fontSize: 32,
    fontWeight: "bold",
    color: LightColors.text,
  },

  headerDark: {
    color: DarkColors.text,
  },

  priorityContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },

  addContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },

  input: {
    flex: 1,
    backgroundColor: LightColors.card,
    padding: 15,
    borderRadius: 15,
    marginRight: 10,
    color: LightColors.text,
  },

  inputDark: {
    backgroundColor: DarkColors.card,
    color: DarkColors.text,
  },

  addButton: {
    backgroundColor: LightColors.primary,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    borderRadius: 15,
  },

  themeToggle: {
    backgroundColor: "rgba(255,255,255,0.12)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
  },

  themeToggleText: {
    fontWeight: "700",
    color: "#111",
  },

  themeToggleDark: {
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  themeToggleTextDark: {
    color: "#FFFFFF",
  },

  addText: {
    color: "white",
    fontWeight: "bold",
  },

  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 2,
  },

  dateLabel: {
    width: 60,
    color: LightColors.text,
    fontWeight: "600",
  },

  dateLabelDark: {
    color: DarkColors.text,
  },

  dateInput: {
    flex: 1,
    backgroundColor: LightColors.card,
    padding: 15,
    borderRadius: 15,
    color: LightColors.text,
  },

  dateInputDark: {
    backgroundColor: DarkColors.card,
    color: DarkColors.text,
  },
});

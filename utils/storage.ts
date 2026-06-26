import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "../types/Task";

const STORAGE_KEY = "tasks";

export const saveTasks = async (tasks: Task[]) => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(tasks)
    );
  } catch (error) {
    console.log("Error saving tasks:", error);
  }
};

export const loadTasks = async (): Promise<Task[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);

    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log("Error loading tasks:", error);
    return [];
  }
};
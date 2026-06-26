export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: "High" | "Medium" | "Low";
  /** ISO date string: "YYYY-MM-DD" */
  date: string;
}

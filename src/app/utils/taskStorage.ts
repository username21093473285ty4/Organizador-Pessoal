import { Task, CalendarSettings, HighlightColor } from '../types/calendar';

const TASKS_KEY = 'calendar_tasks';
const SETTINGS_KEY = 'calendar_settings';

export const taskStorage = {
  getTasks: (): Task[] => {
    try {
      const tasks = localStorage.getItem(TASKS_KEY);
      return tasks ? JSON.parse(tasks) : [];
    } catch {
      return [];
    }
  },

  saveTasks: (tasks: Task[]): void => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  },

  addTask: (task: Task): void => {
    const tasks = taskStorage.getTasks();
    tasks.push(task);
    taskStorage.saveTasks(tasks);
  },

  updateTask: (taskId: string, updates: Partial<Task>): void => {
    const tasks = taskStorage.getTasks();
    const index = tasks.findIndex(t => t.id === taskId);
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...updates };
      taskStorage.saveTasks(tasks);
    }
  },

  deleteTask: (taskId: string): void => {
    const tasks = taskStorage.getTasks();
    const filtered = tasks.filter(t => t.id !== taskId);
    taskStorage.saveTasks(filtered);
  },

  getTasksForDate: (date: string): Task[] => {
    const tasks = taskStorage.getTasks();
    return tasks.filter(t => t.date === date);
  },

  getSettings: (): CalendarSettings => {
    try {
      const settings = localStorage.getItem(SETTINGS_KEY);
      return settings ? JSON.parse(settings) : {
        highlightColor: { name: 'blue', shade: 'light' }
      };
    } catch {
      return { highlightColor: { name: 'blue', shade: 'light' } };
    }
  },

  saveSettings: (settings: CalendarSettings): void => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  },

  updateHighlightColor: (color: HighlightColor): void => {
    const settings = taskStorage.getSettings();
    settings.highlightColor = color;
    taskStorage.saveSettings(settings);
  }
};

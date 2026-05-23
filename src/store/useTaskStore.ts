import { create } from 'zustand';
import type { TaskState } from '../types';
import * as taskService from '../services/taskService';
import { saveTasks, loadTasks } from '../services/storage';

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  filter: 'all',

  // 從 LocalStorage 載入資料
  loadFromStorage: () => {
    const tasks = loadTasks();
    set({ tasks });
  },

  // 新增任務
  addTask: (text: string) => {
    if (!text.trim()) return;
    const newTask = taskService.createTask(text);
    set((state) => {
      const updated = [...state.tasks, newTask];
      saveTasks(updated);
      return { tasks: updated };
    });
  },

  // 刪除任務
  deleteTask: (id: string) => {
    set((state) => {
      const updated = taskService.deleteTask(state.tasks, id);
      saveTasks(updated);
      return { tasks: updated };
    });
  },

  // 切換完成狀態
  toggleTask: (id: string) => {
    set((state) => {
      const updated = taskService.toggleTask(state.tasks, id);
      saveTasks(updated);
      return { tasks: updated };
    });
  },

  // 編輯任務
  editTask: (id: string, text: string) => {
    set((state) => {
      const updated = taskService.editTask(state.tasks, id, text);
      saveTasks(updated);
      return { tasks: updated };
    });
  },

  // 設定篩選器
  setFilter: (filter) => set({ filter }),

  // 清除已完成
  clearCompleted: () => {
    set((state) => {
      const updated = taskService.clearCompleted(state.tasks);
      saveTasks(updated);
      return { tasks: updated };
    });
  },

  // 取得篩選後的任務列表
  filteredTasks: () => {
    const { tasks, filter } = get();
    return taskService.getFilteredTasks(tasks, filter);
  },
}));

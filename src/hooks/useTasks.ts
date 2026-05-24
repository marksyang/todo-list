import { useTaskStore } from '../store/useTaskStore';
import { useEffect, useRef } from 'react';

// 從 LocalStorage 初始化資料（只執行一次）
let initialized = false;
export function useInitializeTasks() {
  const loadFromStorage = useTaskStore((s) => s.loadFromStorage);
  const isRoot = useRef(true);
  useEffect(() => {
    if (!initialized && isRoot.current) {
      loadFromStorage();
      initialized = true;
    }
  }, [loadFromStorage]);
}

// 封裝 Zustand store 的 custom hook
export function useTasks() {
  const {
    filter,
    addTask,
    deleteTask,
    toggleTask,
    editTask,
    setFilter,
    clearCompleted,
    filteredTasks,
  } = useTaskStore();

  return {
    tasks: filteredTasks(),
    filter,
    addTask,
    deleteTask,
    toggleTask,
    editTask,
    setFilter,
    clearCompleted,
  };
}

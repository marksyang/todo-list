import type { Todo } from '../types';

const STORAGE_KEY = 'todo-list-tasks';

// 儲存任務到 LocalStorage
export function saveTasks(tasks: Todo[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks to localStorage:', error);
  }
}

// 從 LocalStorage 載入任務
export function loadTasks(): Todo[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((t) => ({
      id: String(t.id),
      text: String(t.text),
      completed: Boolean(t.completed),
      createdAt: String(t.createdAt),
      completedAt: t.completedAt ? String(t.completedAt) : undefined,
    }));
  } catch (error) {
    console.error('Failed to load tasks from localStorage:', error);
    return [];
  }
}

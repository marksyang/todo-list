import type { Todo, FilterType } from '../types';

// 產生唯一 ID
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// 建立新任務
export function createTask(text: string): Todo {
  return {
    id: generateId(),
    text: text.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
  };
}

// 切換任務完成狀態
export function toggleTask(tasks: Todo[], id: string): Todo[] {
  return tasks.map((t) => {
    if (t.id === id) {
      const newCompleted = !t.completed;
      return {
        ...t,
        completed: newCompleted,
        completedAt: newCompleted ? new Date().toISOString() : undefined,
      };
    }
    return t;
  });
}

// 刪除任務
export function deleteTask(tasks: Todo[], id: string): Todo[] {
  return tasks.filter((t) => t.id !== id);
}

// 編輯任務文字
export function editTask(tasks: Todo[], id: string, text: string): Todo[] {
  return tasks.map((t) =>
    t.id === id ? { ...t, text: text.trim() } : t
  );
}

// 清除已完成的任務
export function clearCompleted(tasks: Todo[]): Todo[] {
  return tasks.filter((t) => !t.completed);
}

// 根據篩選器過濾任務
export function getFilteredTasks(tasks: Todo[], filter: FilterType): Todo[] {
  switch (filter) {
    case 'active':
      return tasks.filter((t) => !t.completed);
    case 'completed':
      return tasks.filter((t) => t.completed);
    default:
      return tasks;
  }
}

// 待辦事項介面定義
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  completedAt?: string;
}

// 篩選器類型
export type FilterType = 'all' | 'active' | 'completed';

// Zustand 狀態介面
export interface TaskState {
  tasks: Todo[];
  filter: FilterType;
  addTask: (text: string) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  editTask: (id: string, text: string) => void;
  setFilter: (filter: FilterType) => void;
  clearCompleted: () => void;
  loadFromStorage: () => void;
  filteredTasks: () => Todo[];
}

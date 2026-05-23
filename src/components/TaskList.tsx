import type { Todo } from '../types';
import { useTasks } from '../hooks/useTasks';
import { TaskItem } from './TaskItem';
import { FilterBar } from './FilterBar';

export function TaskList() {
  const { tasks, filter, setFilter, clearCompleted } = useTasks();

  const handleFilterChange = (filter: 'all' | 'active' | 'completed') => {
    setFilter(filter);
  };

  return (
    <>
      <FilterBar currentFilter={filter} onFilterChange={handleFilterChange} />

      {tasks.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          {filter === 'all' ? '暂无待辦事項' : `没有${filter === 'active' ? '待完成' : '已完成'}的事項`}
        </div>
      ) : (
        <ul className="divide-y divide-gray-100">
          {tasks.map((todo: Todo) => (
            <TaskItem key={todo.id} todo={todo} />
          ))}
        </ul>
      )}

      {tasks.some((t: Todo) => t.completed) && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={clearCompleted}
            className="text-sm text-gray-500 hover:text-red-500 transition-colors"
          >
            清除已完成的事項
          </button>
        </div>
      )}
    </>
  );
}

import { useState } from 'react';
import type { Todo } from '../types';
import { useTasks } from '../hooks/useTasks';

interface TaskItemProps {
  todo: Todo;
}

export function TaskItem({ todo }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const { toggleTask, deleteTask, editTask } = useTasks();

  const handleSave = () => {
    if (editText.trim()) {
      editTask(todo.id, editText);
    }
    setIsEditing(false);
  };

  return (
    <li className="group flex items-center gap-3 py-3 px-2 hover:bg-gray-50 transition-colors">
      {/* 完成切換 */}
      <button
        onClick={() => toggleTask(todo.id)}
        className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
          todo.completed
            ? 'bg-green-500 border-green-500 text-white'
            : 'border-gray-300 hover:border-blue-500'
        }`}
      >
        {todo.completed && (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>

      {/* 任務文字 / 編輯模式 */}
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave();
            if (e.key === 'Escape') {
              setEditText(todo.text);
              setIsEditing(false);
            }
          }}
          className="flex-1 px-2 py-1 border border-blue-500 rounded focus:outline-none"
          autoFocus
        />
      ) : (
        <span
          onDoubleClick={() => {
            setIsEditing(true);
            setEditText(todo.text);
          }}
          className={`flex-1 cursor-pointer ${
            todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
          }`}
        >
          {todo.text}
        </span>
      )}

      {/* 刪除按鈕 */}
      <button
        onClick={() => deleteTask(todo.id)}
        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-all"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </li>
  );
}

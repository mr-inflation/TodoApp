import React, { useState } from 'react';
import { Trash2, Edit2, Check } from 'lucide-react';
import { Todo, TodoCategory } from '../types/Todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => void;
}

const CATEGORY_COLORS: Record<TodoCategory, string> = {
  work: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
  personal: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
  shopping: 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200',
  health: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
  other: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200',
};

const PRIORITY_COLORS = {
  low: '🟢',
  medium: '🟡',
  high: '🔴',
};

export function TodoItem({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(todo.id, {
        title: editTitle,
        description: editDescription || undefined,
        completed: todo.completed,
        updatedAt: new Date(),
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setIsEditing(false);
  };

  const formatDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const isDueSoon = () => {
    if (!todo.dueDate) return false;
    const due = new Date(todo.dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 1 && diffDays > 0;
  };

  const isOverdue = () => {
    if (!todo.dueDate || todo.completed) return false;
    const due = new Date(todo.dueDate);
    return due < new Date();
  };

  if (isEditing) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-2">
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="w-full text-lg font-medium mb-2 p-2 border border-gray-200 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 dark:text-white"
        />
        <textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          rows={2}
          className="w-full p-2 border border-gray-200 dark:border-gray-600 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-gray-50 dark:bg-gray-700 dark:text-white"
        />
        <div className="flex gap-2 mt-3">
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="px-3 py-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded text-sm hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-2 transition-all ${
        todo.completed ? 'opacity-60' : ''
      } ${
        isOverdue() ? 'border-red-300 dark:border-red-700' : ''
      } ${
        isDueSoon() ? 'border-yellow-300 dark:border-yellow-700' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle(todo.id)}
          className={`mt-1 flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
            todo.completed
              ? 'bg-green-500 border-green-500'
              : 'border-gray-300 dark:border-gray-600 hover:border-green-500'
          }`}
        >
          {todo.completed && <Check size={16} className="text-white" />}
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3
              className={`text-lg font-medium ${
                todo.completed ? 'line-through text-gray-400' : 'text-gray-900 dark:text-white'
              }`}
            >
              {todo.title}
            </h3>
            <span className="text-sm">{PRIORITY_COLORS[todo.priority]}</span>
          </div>
          {todo.description && (
            <p
              className={`mt-1 text-sm ${
                todo.completed
                  ? 'text-gray-400'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {todo.description}
            </p>
          )}
          <div className="flex gap-2 mt-2 flex-wrap items-center">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${CATEGORY_COLORS[todo.category]}`}>
              {todo.category}
            </span>
            {todo.dueDate && (
              <span
                className={`text-xs font-medium px-2 py-1 rounded ${
                  isOverdue()
                    ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                    : isDueSoon()
                      ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                      : 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                }`}
              >
                {isOverdue() ? '⏰ Overdue' : isDueSoon() ? '⚠️ Due Soon' : '📅'} {new Date(todo.dueDate).toLocaleDateString()}
              </span>
            )}
            {todo.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
          <p className="mt-2 text-xs text-gray-400">
            Updated: {formatDate(todo.updatedAt)}
          </p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded transition-colors"
            title="Edit"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 rounded transition-colors"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

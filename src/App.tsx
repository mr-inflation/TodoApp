import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { ThemeToggle } from './components/ThemeToggle';
import { ImportExport } from './components/ImportExport';
import { useTodoStorage } from './hooks/useTodoStorage';
import { useTheme } from './hooks/useTheme';

type FilterType = 'all' | 'active' | 'completed' | 'overdue';

function App() {
  const { todos, isLoaded, addTodo, updateTodo, deleteTodo, toggleTodo, clearCompleted, exportTodos, importTodos } =
    useTodoStorage();
  const { theme, toggleTheme } = useTheme();
  const [filter, setFilter] = useState<FilterType>('all');

  const completedCount = todos.filter((t) => t.completed).length;
  const activeCount = todos.filter((t) => !t.completed).length;
  const overdueCount = todos.filter((t) => {
    if (!t.dueDate || t.completed) return false;
    return new Date(t.dueDate) < new Date();
  }).length;

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 dark:border-gray-600 border-t-blue-500"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8 transition-colors">
      <div className="max-w-2xl mx-auto">
        {/* Header with Theme Toggle */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">📋 Task Manager</h1>
            <p className="text-gray-600 dark:text-gray-400">Stay organized and track your productivity</p>
          </div>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 text-center">
            <div className="text-3xl font-bold text-blue-500">📊</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{todos.length}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Total</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 text-center">
            <div className="text-3xl font-bold text-yellow-500">⏳</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{activeCount}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Active</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 text-center">
            <div className="text-3xl font-bold text-green-500">✅</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{completedCount}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Completed</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 text-center">
            <div className="text-3xl font-bold text-red-500">⏰</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{overdueCount}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Overdue</div>
          </div>
        </div>

        {/* Add Todo Form */}
        <TodoForm
          onAdd={(data) =>
            addTodo({
              ...data,
            })
          }
        />

        {/* Import/Export */}
        <div className="mb-6">
          <ImportExport onExport={exportTodos} onImport={importTodos} />
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(['all', 'active', 'completed', 'overdue'] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === f
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Todo List */}
        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} onUpdate={updateTodo} filter={filter} />

        {/* Clear Completed Button */}
        {completedCount > 0 && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={clearCompleted}
              className="flex items-center gap-2 px-4 py-2 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg border border-red-200 dark:border-red-800/50 transition-colors"
            >
              <Trash2 size={18} />
              Clear Completed ({completedCount})
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import { CheckCircle, Circle, Trash2 } from 'lucide-react';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { useTodoStorage } from './hooks/useTodoStorage';

type FilterType = 'all' | 'active' | 'completed';

function App() {
  const { todos, isLoaded, addTodo, updateTodo, deleteTodo, toggleTodo, clearCompleted } = useTodoStorage();
  const [filter, setFilter] = useState<FilterType>('all');

  const completedCount = todos.filter((t) => t.completed).length;
  const activeCount = todos.filter((t) => !t.completed).length;

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">📋 Task Manager</h1>
          <p className="text-gray-600">Stay organized and track your productivity</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
            <div className="text-3xl font-bold text-blue-500">{todos.length}</div>
            <div className="text-sm text-gray-600 mt-1">Total Tasks</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
            <div className="text-3xl font-bold text-yellow-500">{activeCount}</div>
            <div className="text-sm text-gray-600 mt-1">Active</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
            <div className="text-3xl font-bold text-green-500">{completedCount}</div>
            <div className="text-sm text-gray-600 mt-1">Completed</div>
          </div>
        </div>

        {/* Add Todo Form */}
        <TodoForm onAdd={(title, description) => addTodo({ title, description })} />

        {/* Filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(['all', 'active', 'completed'] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === f
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Todo List */}
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onUpdate={updateTodo}
          filter={filter}
        />

        {/* Clear Completed Button */}
        {completedCount > 0 && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={clearCompleted}
              className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg border border-red-200 transition-colors"
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

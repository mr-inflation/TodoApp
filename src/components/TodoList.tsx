import React from 'react';
import { TodoItem } from './TodoItem';
import { Todo } from '../types/Todo';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => void;
  filter: 'all' | 'active' | 'completed';
}

export function TodoList({ todos, onToggle, onDelete, onUpdate, filter }: TodoListProps) {
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  if (filteredTodos.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400 text-lg">
          {todos.length === 0 ? '📝 No tasks yet. Create one to get started!' : '✨ No tasks in this filter.'}
        </p>
      </div>
    );
  }

  return (
    <div>
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}

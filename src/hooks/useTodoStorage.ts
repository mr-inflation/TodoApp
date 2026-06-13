import { useState, useEffect, useCallback } from 'react';
import { Todo, TodoWithoutId, TodoCategory } from '../types/Todo';

const STORAGE_KEY = 'todos';

export function useTodoStorage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load todos from local storage on mount
  useEffect(() => {
    const loadTodos = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          const todos = parsed.map((todo: any) => ({
            ...todo,
            createdAt: new Date(todo.createdAt),
            updatedAt: new Date(todo.updatedAt),
          }));
          setTodos(todos);
        }
      } catch (error) {
        console.error('Failed to load todos from storage:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadTodos();
  }, []);

  // Save todos to local storage whenever they change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
      } catch (error) {
        console.error('Failed to save todos to storage:', error);
      }
    }
  }, [todos, isLoaded]);

  const addTodo = useCallback((data: Omit<TodoWithoutId, 'createdAt' | 'updatedAt'>) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      completed: false,
      category: data.category,
      dueDate: data.dueDate,
      priority: data.priority,
      tags: data.tags || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTodos((prev) => [newTodo, ...prev]);
    return newTodo;
  }, []);

  const updateTodo = useCallback((id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              ...updates,
              updatedAt: new Date(),
            }
          : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              updatedAt: new Date(),
            }
          : todo
      )
    );
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  }, []);

  const exportTodos = useCallback(() => {
    const dataStr = JSON.stringify(todos, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `todos-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [todos]);

  const importTodos = useCallback((file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target?.result as string);
          if (Array.isArray(imported)) {
            const validTodos = imported.filter((todo: any) => todo.title && todo.id);
            setTodos((prev) => [...validTodos, ...prev]);
            resolve();
          } else {
            reject(new Error('Invalid file format'));
          }
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  }, []);

  return {
    todos,
    isLoaded,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    clearCompleted,
    exportTodos,
    importTodos,
  };
}

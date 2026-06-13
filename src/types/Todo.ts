export type TodoCategory = 'work' | 'personal' | 'shopping' | 'health' | 'other';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  category: TodoCategory;
  dueDate?: string; // ISO date string
  priority: 'low' | 'medium' | 'high';
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type TodoWithoutId = Omit<Todo, 'id'>;

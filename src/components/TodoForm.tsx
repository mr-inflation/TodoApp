import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { TodoCategory } from '../types/Todo';

interface TodoFormProps {
  onAdd: (data: {
    title: string;
    description?: string;
    category: TodoCategory;
    dueDate?: string;
    priority: 'low' | 'medium' | 'high';
    tags: string[];
  }) => void;
}

const CATEGORIES: { value: TodoCategory; label: string; color: string }[] = [
  { value: 'work', label: '💼 Work', color: 'bg-blue-100 text-blue-800' },
  { value: 'personal', label: '👤 Personal', color: 'bg-purple-100 text-purple-800' },
  { value: 'shopping', label: '🛒 Shopping', color: 'bg-orange-100 text-orange-800' },
  { value: 'health', label: '❤️ Health', color: 'bg-red-100 text-red-800' },
  { value: 'other', label: '📌 Other', color: 'bg-gray-100 text-gray-800' },
];

export function TodoForm({ onAdd }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<TodoCategory>('personal');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd({
        title,
        description: description || undefined,
        category,
        dueDate: dueDate || undefined,
        priority,
        tags,
      });
      setTitle('');
      setDescription('');
      setCategory('personal');
      setDueDate('');
      setPriority('medium');
      setTags([]);
      setIsExpanded(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setIsExpanded(true)}
          placeholder="Add a new task..."
          className="w-full text-lg font-medium placeholder-gray-400 focus:outline-none bg-transparent dark:text-white"
        />

        {isExpanded && (
          <>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description (optional)..."
              rows={2}
              className="w-full mt-3 p-2 border border-gray-200 dark:border-gray-600 rounded text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-gray-50 dark:bg-gray-700 dark:text-white"
            />

            {/* Category Selection */}
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <div className="flex gap-2 flex-wrap">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setCategory(cat.value)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                      category === cat.value
                        ? `${cat.color} ring-2 ring-offset-2 dark:ring-offset-gray-800`
                        : `${cat.color} opacity-60 hover:opacity-100`
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Due Date and Priority */}
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-200 dark:border-gray-600 rounded text-sm bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="w-full px-2 py-1 border border-gray-200 dark:border-gray-600 rounded text-sm bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">🟢 Low</option>
                  <option value="medium">🟡 Medium</option>
                  <option value="high">🔴 High</option>
                </select>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tags
              </label>
              <div className="flex gap-2 mb-2 flex-wrap">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  placeholder="Add tag and press Enter"
                  className="flex-1 px-2 py-1 border border-gray-200 dark:border-gray-600 rounded text-sm bg-gray-50 dark:bg-gray-700 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded text-sm hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                type="submit"
                disabled={!title.trim()}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Plus size={18} />
                Add Task
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsExpanded(false);
                  setTitle('');
                  setDescription('');
                  setCategory('personal');
                  setDueDate('');
                  setPriority('medium');
                  setTags([]);
                }}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </form>
  );
}

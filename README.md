# 📋 Todo App - Task Manager

A beautiful, modern to-do list application built with React, TypeScript, and Tailwind CSS. Features local storage persistence so your tasks are saved automatically.

## ✨ Features

- ✅ **Add/Edit/Delete** tasks with ease
- ✅ **Mark tasks as complete** with visual feedback
- 💾 **Auto-save to browser** local storage
- 🎨 **Beautiful UI** with Tailwind CSS
- 📱 **Responsive design** for all devices
- 🔍 **Filter tasks** by All/Active/Completed
- 📊 **Task statistics** showing total, active, and completed counts
- ⏰ **Timestamps** for when tasks were created and updated
- 📝 **Optional descriptions** for detailed task info

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mr-inflation/TodoApp.git
cd TodoApp
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist` directory.

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── TodoForm.tsx     # Form to add new tasks
│   ├── TodoItem.tsx     # Individual task component
│   └── TodoList.tsx     # List display component
├── hooks/              # Custom React hooks
│   └── useTodoStorage.ts # Local storage management
├── types/              # TypeScript types
│   └── Todo.ts         # Todo interface definitions
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles with Tailwind
```

## 🎨 Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Lucide Icons** - Icon library

## 💡 How It Works

### Local Storage
Tasks are automatically saved to browser local storage whenever you add, edit, delete, or complete a task. On page reload, your tasks are restored automatically.

### Custom Hook: `useTodoStorage`
Manages all todo operations and local storage persistence:
- `addTodo(title, description)` - Add a new task
- `updateTodo(id, updates)` - Update task properties
- `deleteTodo(id)` - Remove a task
- `toggleTodo(id)` - Mark task as complete/incomplete
- `clearCompleted()` - Remove all completed tasks

## 📝 Usage Examples

### Adding a Task
1. Click the input field "Add a new task..."
2. Type your task title
3. Optionally add a description
4. Click "Add Task" or press Enter

### Editing a Task
1. Click the edit icon (✏️) on any task
2. Modify the title or description
3. Click "Save" to apply changes

### Completing a Task
- Click the checkbox next to a task to mark it as complete
- Completed tasks appear grayed out

### Filtering Tasks
- Click "All" to see all tasks
- Click "Active" to see incomplete tasks
- Click "Completed" to see finished tasks

## 🔐 Data Privacy

All your task data is stored **locally in your browser**. Nothing is sent to any server. Your data is yours and only yours.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements!

## 📧 Support

If you encounter any issues or have suggestions, please open an issue on GitHub.

---

**Made with ❤️ by mr-inflation**

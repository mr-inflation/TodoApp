# 📋 Task Manager - Advanced Todo App

A **feature-rich, beautiful task manager** built with React, TypeScript, and Tailwind CSS. Features local storage persistence, dark mode, categories, priorities, due dates, and more!

![Features](https://img.shields.io/badge/Features-11-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)
![React](https://img.shields.io/badge/React-19-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4-blue)

## ✨ Features

### Core Features
- ✅ **Add/Edit/Delete** tasks with ease
- ✅ **Mark tasks as complete** with visual feedback  
- 💾 **Auto-save to browser** local storage
- 🔄 **Export/Import** tasks as JSON for backup
- 📋 **Filter tasks** by All/Active/Completed/Overdue

### Advanced Features
- 🏷️ **Categories** - Work, Personal, Shopping, Health, Other
- 🔴 **Priority Levels** - Low (🟢), Medium (🟡), High (🔴)
- 📅 **Due Dates** - Set deadlines with visual indicators
- ⚠️ **Overdue Tracking** - See tasks that need attention
- 🏷️ **Tags** - Add custom tags to organize tasks
- 📊 **Statistics** - Dashboard showing Total, Active, Completed, and Overdue counts
- ⏰ **Timestamps** - Track when tasks were created and last updated

### UI/UX Features
- 🌙 **Dark Mode** - Easy on the eyes with automatic detection
- 📱 **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- 🎨 **Beautiful UI** - Modern design with smooth transitions
- ♿ **Accessible** - Keyboard-friendly and screen reader compatible
- ⚡ **Fast** - Instant local storage, no API calls

### Progressive Web App (PWA)
- 📲 **Installable** - Add to home screen
- 🔌 **Offline Support** - Service worker for offline access
- 🚀 **App-like Experience** - Standalone mode without browser UI

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
├── components/                    # React components
│   ├── TodoForm.tsx              # Form to add/edit tasks with all fields
│   ├── TodoItem.tsx              # Individual task component
│   ├── TodoList.tsx              # List display with filtering
│   ├── ThemeToggle.tsx           # Light/Dark mode toggle
│   └── ImportExport.tsx          # Export/Import functionality
├── hooks/                         # Custom React hooks
│   ├── useTodoStorage.ts         # Local storage management
│   └── useTheme.ts               # Dark mode management
├── types/                         # TypeScript types
│   └── Todo.ts                   # Todo interface with all properties
├── App.tsx                        # Main app component
├── main.tsx                       # Entry point
└── index.css                      # Global styles with Tailwind

public/
├── favicon.svg                    # App icon
├── manifest.json                  # PWA manifest
└── service-worker.js             # Service worker for offline support
```

## 🎨 Tech Stack

- **React 19** - UI framework
- **TypeScript 5.8** - Type safety
- **Tailwind CSS 4** - Styling with dark mode
- **Vite 6** - Lightning-fast build tool
- **Lucide Icons** - Beautiful icon library
- **PWA** - Progressive Web App support

## 💡 How It Works

### Local Storage
Tasks are automatically saved to browser local storage whenever you add, edit, delete, or complete a task. On page reload, your tasks are restored automatically.

### Custom Hooks

**`useTodoStorage`** - Manages all todo operations:
- `addTodo(data)` - Add a new task
- `updateTodo(id, updates)` - Update task properties
- `deleteTodo(id)` - Remove a task
- `toggleTodo(id)` - Mark task as complete/incomplete
- `clearCompleted()` - Remove all completed tasks
- `exportTodos()` - Download tasks as JSON
- `importTodos(file)` - Import tasks from JSON file

**`useTheme`** - Manages theme:
- `theme` - Current theme ('light' or 'dark')
- `toggleTheme()` - Switch between themes

### Dark Mode
Automatically detects system preference and allows manual toggle. Theme preference is saved to local storage.

## 📚 Usage Examples

### Adding a Task with All Features
1. Click the input field "Add a new task..."
2. Type your task title
3. Optionally add:
   - Description
   - Category (Work, Personal, Shopping, Health, Other)
   - Due Date
   - Priority (Low, Medium, High)
   - Tags (custom labels)
4. Click "Add Task"

### Editing a Task
1. Click the edit icon (✏️) on any task
2. Modify any field
3. Click "Save"

### Filtering Tasks
- **All** - Show all tasks
- **Active** - Show incomplete tasks
- **Completed** - Show finished tasks
- **Overdue** - Show tasks past their due date

### Exporting Tasks
1. Click "Export" button
2. Tasks are downloaded as `todos-YYYY-MM-DD.json`

### Importing Tasks
1. Click "Import" button
2. Select a previously exported JSON file
3. Tasks are added to your current list

### Installing as App
1. Open in Chrome/Edge/Brave
2. Click the "Install" button in the address bar
3. Use like a native app!

## 🎯 Data Structure

```typescript
interface Todo {
  id: string;                           // Unique ID
  title: string;                        // Task title (required)
  description?: string;                 // Detailed description
  completed: boolean;                   // Completion status
  category: 'work' | 'personal' | ...  // Task category
  dueDate?: string;                     // ISO date string
  priority: 'low' | 'medium' | 'high';  // Priority level
  tags: string[];                       // Custom tags
  createdAt: Date;                      // Creation timestamp
  updatedAt: Date;                      // Last update timestamp
}
```

## 🔒 Data Privacy

All your task data is stored **locally in your browser**. Nothing is sent to any server. Your data is yours and only yours.

## 🌐 Browser Support

- ✅ Chrome/Edge/Brave (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Mobile browsers

## 📱 PWA Features

- **Install on Home Screen** - Add the app to your device
- **Offline Support** - Works without internet connection
- **App Icon** - Custom favicon and app icon
- **Web Manifest** - Proper PWA configuration

## 🚀 Performance

- ⚡ **Instant Load** - Local storage, no network delays
- 📦 **Small Bundle** - ~50KB gzipped
- 🎯 **Optimized** - React 19 with strict mode
- 🔄 **Efficient Rendering** - Memoized components

## 📝 Keyboard Shortcuts

- `Enter` - Add new tag while typing
- `Tab` - Navigate between fields
- `Escape` - Cancel editing

## 🐛 Bug Reports & Features

Found a bug or have a feature request? Please open an issue on GitHub!

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Contributing

Contributions are welcome! Feel free to:
- Fork the repository
- Create a feature branch
- Submit a pull request

## 🎉 Changelog

### v2.0.0 - Complete Enhancement
- ✨ Added dark mode support
- ✨ Added categories (Work, Personal, Shopping, Health, Other)
- ✨ Added priority levels (Low, Medium, High)
- ✨ Added due dates with overdue tracking
- ✨ Added custom tags
- ✨ Added export/import functionality
- ✨ Added PWA support (installable, offline)
- 🎨 Improved UI with better colors and icons
- 📱 Enhanced responsive design
- ⚡ Performance optimizations

### v1.0.0 - Initial Release
- Basic todo CRUD operations
- Local storage persistence
- Task filtering
- Beautiful UI with Tailwind CSS

---

**Made with ❤️ by mr-inflation**

[GitHub](https://github.com/mr-inflation) | [Portfolio](https://github.com/mr-inflation)

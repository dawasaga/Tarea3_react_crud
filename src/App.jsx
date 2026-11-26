import React, { useState } from 'react';
import { Layers } from 'lucide-react';
import './App.css';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { TaskEditModal } from './components/TaskEditModal';

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  // Agregar nueva tarea (Create)
  const handleAddTask = (newTask) => {
    setTasks([newTask, ...tasks]);
  };

  // Alternar completada / pendiente (Update rápido con .map)
  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Guardar tarea editada (Update completo con .map)
  const handleSaveTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setEditingTask(null); // Cierra el modal
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="brand-wrapper">
          <div className="brand-icon">
            <Layers size={26} />
          </div>
          <div>
            <h1 className="brand-title">TaskFlow CRUD</h1>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="dashboard-grid">
        <section className="card">
          <TaskForm onAddTask={handleAddTask} />
        </section>

        <section className="card">
          <TaskList
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onEditTask={(task) => setEditingTask(task)}
          />
        </section>
      </main>

      {/* Modal de edición condicional */}
      {editingTask && (
        <TaskEditModal
          task={editingTask}
          onSave={handleSaveTask}
          onClose={() => setEditingTask(null)}
        />
      )}
    </div>
  );
}

export default App;

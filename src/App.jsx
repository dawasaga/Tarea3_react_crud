import React, { useState, useEffect } from 'react';
import { Layers } from 'lucide-react';
import './App.css';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { TaskEditModal } from './components/TaskEditModal';

function App() {
  // Inicializamos el estado leyendo desde LocalStorage
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem('taskflow_tasks');
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch {
      return [];
    }
  });

  const [editingTask, setEditingTask] = useState(null);

  // Hook useEffect: Guarda automáticamente en LocalStorage cada vez que cambien las tareas
  useEffect(() => {
    localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Agregar nueva tarea (Create)
  const handleAddTask = (newTask) => {
    setTasks([newTask, ...tasks]);
  };

  // Alternar completada / pendiente (Update)
  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Guardar tarea editada (Update)
  const handleSaveTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setEditingTask(null);
  };

  // Eliminar tarea individual (Delete con .filter)
  const handleDeleteTask = (id) => {
    const confirmDelete = window.confirm('¿Seguro que deseas eliminar esta tarea?');
    if (confirmDelete) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  // Limpiar todas las tareas completadas
  const handleClearCompleted = () => {
    const confirmClear = window.confirm('¿Seguro que deseas eliminar todas las tareas completadas?');
    if (confirmClear) {
      setTasks(tasks.filter((task) => !task.completed));
    }
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
            onDeleteTask={handleDeleteTask}
            onClearCompleted={handleClearCompleted}
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

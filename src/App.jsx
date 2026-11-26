import React, { useState, useEffect } from 'react';
import { Layers, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import './App.css';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { TaskEditModal } from './components/TaskEditModal';

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem('taskflow_tasks');
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch {
      return [];
    }
  });

  const [editingTask, setEditingTask] = useState(null);
  const [toast, setToast] = useState(null); // { message, type: 'success' | 'error' | 'info' }

  // Función para mostrar notificaciones flotantes (Toast)
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  // Guardar en LocalStorage cada vez que cambien las tareas
  useEffect(() => {
    localStorage.setItem('taskflow_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Agregar nueva tarea
  const handleAddTask = (newTask) => {
    setTasks([newTask, ...tasks]);
    showToast('¡Tarea agregada exitosamente!', 'success');
  };

  // Alternar completada / pendiente
  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          const nextState = !task.completed;
          showToast(
            nextState ? 'Tarea marcada como completada' : 'Tarea pendiente',
            'info'
          );
          return { ...task, completed: nextState };
        }
        return task;
      })
    );
  };

  // Guardar tarea editada
  const handleSaveTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setEditingTask(null);
    showToast('Tarea actualizada correctamente', 'info');
  };

  // Eliminar tarea individual
  const handleDeleteTask = (id) => {
    const confirmDelete = window.confirm('¿Seguro que deseas eliminar esta tarea?');
    if (confirmDelete) {
      setTasks(tasks.filter((task) => task.id !== id));
      showToast('Tarea eliminada', 'error');
    }
  };

  // Limpiar todas las tareas completadas
  const handleClearCompleted = () => {
    const confirmClear = window.confirm('¿Seguro que deseas eliminar todas las tareas completadas?');
    if (confirmClear) {
      setTasks(tasks.filter((task) => !task.completed));
      showToast('Tareas completadas eliminadas', 'info');
    }
  };

  return (
    <div className="app-container">
      {/* Toast flotante */}
      {toast && (
        <div className={`toast-notification toast-${toast.type}`}>
          {toast.type === 'success' && <CheckCircle2 size={18} />}
          {toast.type === 'error' && <AlertCircle size={18} />}
          {toast.type === 'info' && <Info size={18} />}
          <span>{toast.message}</span>
        </div>
      )}

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
          <TaskForm onAddTask={handleAddTask} onError={(msg) => showToast(msg, 'error')} />
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

      {/* Modal de edición */}
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

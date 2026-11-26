import React, { useState } from 'react';
import { Layers, GitBranch, Terminal } from 'lucide-react';
import './App.css';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';

function App() {

  const [tasks, setTasks] = useState([]);

  const handleAddTask = (newTask) => {
    setTasks([newTask, ...tasks])
    console.log('Tarea agregada exitosamente', newTask);
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

        <div className="badges-group">
          <span className="badge badge-gitflow">
            <GitBranch size={14} /> Git Flow Enabled
          </span>
          <span className="badge">
            <Terminal size={14} /> React + Vite
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="dashboard-grid">
      <section className="card">
          <TaskForm onAddTask={handleAddTask} />

      </section>

        <section className="card">
          <TaskList tasks={tasks} />
        </section>
      </main>
    </div>
  );
}

export default App;

import React from 'react';
import { Layers, GitBranch, Terminal } from 'lucide-react';
import './App.css';

function App() {
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
            <p className="brand-subtitle">Programación III • Demostración de Git Flow & React</p>
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
          <h2 className="card-title">Módulo de Tareas</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Inicializando estructura base para ramas de características (features).
          </p>
        </section>

        <section className="card">
          <h2 className="card-title">Panel de Control</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Visualización y administración de tareas en desarrollo.
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import { Search, CheckCircle2, Clock, Calendar, Tag, AlertCircle } from 'lucide-react';

export function TaskList({ tasks }) {
  // Estados locales para los filtros de búsqueda y estado
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'pending' | 'completed'

  // Filtrado reactivo en tiempo real (estado derivado)
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterStatus === 'pending') return matchesSearch && !task.completed;
    if (filterStatus === 'completed') return matchesSearch && task.completed;
    return matchesSearch;
  });

  // Métricas rápidas
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="task-list-container">
      <div className="list-header">
        <h3 className="section-title">Listado de Tareas ({filteredTasks.length})</h3>

        {/* Métricas */}
        <div className="metrics-bar">
          <span className="metric-pill">Total: {totalTasks}</span>
          <span className="metric-pill metric-pending">Pendientes: {pendingTasks}</span>
          <span className="metric-pill metric-completed">Completadas: {completedTasks}</span>
        </div>
      </div>

      {/* Barra de Filtros y Búsqueda */}
      <div className="filters-wrapper">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por título o descripción..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-tabs">
          <button
            type="button"
            className={`tab-btn ${filterStatus === 'all' ? 'active' : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            Todas
          </button>
          <button
            type="button"
            className={`tab-btn ${filterStatus === 'pending' ? 'active' : ''}`}
            onClick={() => setFilterStatus('pending')}
          >
            Pendientes
          </button>
          <button
            type="button"
            className={`tab-btn ${filterStatus === 'completed' ? 'active' : ''}`}
            onClick={() => setFilterStatus('completed')}
          >
            Completadas
          </button>
        </div>
      </div>

      {/* Lista de Tareas con .map() */}
      {filteredTasks.length === 0 ? (
        <div className="empty-state">
          <AlertCircle size={36} color="var(--text-muted)" />
          <p>No se encontraron tareas con los filtros actuales.</p>
        </div>
      ) : (
        <div className="tasks-grid">
          {filteredTasks.map((task) => (
            <article
              key={task.id}
              className={`task-card ${task.completed ? 'task-card-completed' : ''}`}
            >
              <div className="card-top">
                <span className={`priority-badge priority-${task.priority.toLowerCase()}`}>
                  {task.priority}
                </span>
                <span className="category-badge">
                  <Tag size={12} /> {task.category}
                </span>
              </div>

              <h4 className="task-title">{task.title}</h4>
              {task.description && <p className="task-desc">{task.description}</p>}

              <div className="card-footer">
                <div className="task-meta">
                  <Calendar size={13} />
                  <span>Vence: {task.dueDate}</span>
                </div>
                <div className="task-status-pill">
                  {task.completed ? (
                    <span className="status-done"><CheckCircle2 size={14} /> Lista</span>
                  ) : (
                    <span className="status-wait"><Clock size={14} /> Pendiente</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

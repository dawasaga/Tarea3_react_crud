import React, { useState } from 'react';
import { Search, CheckCircle2, Circle, Edit3, Trash2, Calendar, Tag, AlertCircle } from 'lucide-react';

export function TaskList({ tasks, onToggleTask, onEditTask, onDeleteTask, onClearCompleted }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterStatus === 'pending') return matchesSearch && !task.completed;
    if (filterStatus === 'completed') return matchesSearch && task.completed;
    return matchesSearch;
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  return (
    <div className="task-list-container">
      <div className="list-header">
        <h3 className="section-title">Listado de Tareas ({filteredTasks.length})</h3>

        <div className="metrics-bar">
          <span className="metric-pill">Total: {totalTasks}</span>
          <span className="metric-pill metric-pending">Pendientes: {pendingTasks}</span>
          <span className="metric-pill metric-completed">Completadas: {completedTasks}</span>
          {completedTasks > 0 && (
            <button
              type="button"
              className="btn-clear-completed"
              onClick={onClearCompleted}
              title="Eliminar todas las tareas completadas"
            >
              <Trash2 size={13} /> Limpiar completadas
            </button>
          )}
        </div>
      </div>

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

              {/* Título con toggle para marcar completada */}
              <div className="card-title-row">
                <button
                  type="button"
                  className="toggle-status-btn"
                  title={task.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
                  onClick={() => onToggleTask && onToggleTask(task.id)}
                >
                  {task.completed ? (
                    <CheckCircle2 size={22} className="icon-completed" />
                  ) : (
                    <Circle size={22} className="icon-pending" />
                  )}
                </button>
                <h4 className={`task-title ${task.completed ? 'title-completed' : ''}`}>
                  {task.title}
                </h4>
              </div>

              {task.description && <p className="task-desc">{task.description}</p>}

              <div className="card-footer">
                <div className="task-meta">
                  <Calendar size={13} />
                  <span>Vence: {task.dueDate}</span>
                </div>

                {/* Acciones: Editar y Eliminar */}
                <div className="card-actions">
                  <button
                    type="button"
                    className="action-btn edit-btn"
                    onClick={() => onEditTask && onEditTask(task)}
                    title="Editar tarea"
                  >
                    <Edit3 size={15} /> Editar
                  </button>
                  <button
                    type="button"
                    className="action-btn delete-btn"
                    onClick={() => onDeleteTask && onDeleteTask(task.id)}
                    title="Eliminar tarea"
                  >
                    <Trash2 size={15} /> Eliminar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

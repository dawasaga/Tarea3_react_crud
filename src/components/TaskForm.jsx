import React, { useState } from 'react';
import { PlusCircle, AlertCircle } from 'lucide-react';

export function TaskForm({ onAddTask, onError }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Media');
  const [category, setCategory] = useState('Trabajo');
  const [dueDate, setDueDate] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Hotfix: Validación estricta contra espacios vacíos y longitud mínima
    const trimmedTitle = title.trim();
    if (!trimmedTitle || trimmedTitle.length < 3) {
      setValidationError('El título debe contener al menos 3 caracteres no vacíos.');
      if (onError) onError('El título debe contener al menos 3 caracteres no vacíos.');
      return;
    }

    setValidationError('');

    const newTask = {
      id: crypto.randomUUID(),
      title: trimmedTitle,
      description: description.trim(),
      priority,
      category,
      dueDate: dueDate || new Date().toISOString().split('T')[0],
      completed: false,
      createdAt: new Date().toLocaleDateString('es-DO')
    };

    onAddTask(newTask);

    // Reset de campos
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h3 className="form-heading">Nueva Tarea</h3>

      {validationError && (
        <div className="form-error-banner">
          <AlertCircle size={16} />
          <span>{validationError}</span>
        </div>
      )}

      <div className="form-group">
        <label>Título de la tarea *</label>
        <input
          type="text"
          placeholder="Ej: Estudiar Git Flow..."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (validationError) setValidationError('');
          }}
          required
        />
      </div>

      <div className="form-group">
        <label>Descripción</label>
        <textarea
          placeholder="Detalles adicionales..."
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Prioridad</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
          </select>
        </div>

        <div className="form-group">
          <label>Categoría</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Trabajo">Trabajo</option>
            <option value="Estudio">Estudio</option>
            <option value="Personal">Personal</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Fecha límite</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        <PlusCircle size={18} /> Agregar Tarea
      </button>
    </form>
  );
}

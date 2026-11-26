import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

export function TaskForm({ onAddTask }) {
  // 1. Estado local para cada campo del formulario
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Media');
  const [category, setCategory] = useState('Trabajo');
  const [dueDate, setDueDate] = useState('');

  // 2. Manejador del envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que el navegador recargue la página

    if (!title.trim()) {
      alert('Por favor ingresa un título para la tarea.');
      return;
    }

    // 3. Crear el nuevo objeto tarea
    const newTask = {
      id: crypto.randomUUID(), // Genera un ID único automático
      title,
      description,
      priority,
      category,
      dueDate: dueDate || new Date().toISOString().split('T')[0],
      completed: false,
      createdAt: new Date().toLocaleDateString('es-DO')
    };

    // 4. Se lo enviamos al componente padre (App.jsx)
    onAddTask(newTask);

    // 5. Limpiamos los campos del formulario
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h3 className="form-heading">Nueva Tarea</h3>

      <div className="form-group">
        <label>Título de la tarea *</label>
        <input
          type="text"
          placeholder="Ej: Estudiar Git Flow..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
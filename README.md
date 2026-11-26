# TaskFlow - React CRUD Application

> **Asignatura:** Programación III  
> **Profesor:** Kelyn Tejada  
> **Estudiante:** Kevin Mercedes  
> **Metodología:** Git Flow con control de versiones riguroso

---

## Descripción del Proyecto
TaskFlow es una aplicación web moderna de gestión de tareas (CRUD) desarrollada con **React** y **Vite**. Permite a los usuarios crear, visualizar, filtrar, editar y eliminar tareas con almacenamiento local persistente (`localStorage`).

La arquitectura y flujo de desarrollo sigue estrictamente la metodología **Git Flow**, organizada en ramas:
- `main`: Rama de producción / código estable.
- `qa`: Rama de aseguramiento de la calidad (staging).
- `dev`: Rama de integración y desarrollo activo.
- Ramas de características (`feature/*`) y correcciones urgentes (`hotfix/*`).

---

## Tecnologías Utilizadas
- **React 19**: Biblioteca para la interfaz de usuario basada en componentes y hooks (`useState`, `useEffect`).
- **Vite**: Entorno de desarrollo rápido y empaquetador moderno.
- **Lucide React**: Iconografía minimalista y moderna.
- **CSS3 Moderno**: Diseño responsivo, paleta oscura/clara elegante y animaciones fluidas.
- **LocalStorage API**: Persistencia de datos en el navegador del cliente sin dependencias de base de datos externas.

---

## Estructura de Ramas Git Flow
1. `feature/task-form-create` (Create): Formulario controlado para registrar tareas.
2. `feature/task-list-view` (Read): Visualización en tarjetas, filtros por prioridad y buscador en tiempo real.
3. `feature/task-update-status` (Update): Cambio de estado (pendiente/completada) y edición modal.
4. `feature/task-delete-clear` (Delete): Eliminación individual, vaciado masivo y sincronización con LocalStorage.
5. `hotfix/fix-empty-validation` (Hotfix): Validación contra entradas vacías, fechas inválidas y alertas de estado.
6. `hotfix/fix-textarea-resize` (Hotfix): Restricción de redimensionamiento de textarea para prevenir desbordamiento visual en la interfaz.

---

## Cómo ejecutar el proyecto localmente

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/dawasaga/Tarea3_react_crud.git
   cd Tarea3_react_crud
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abrir en el navegador en la URL indicada (habitualmente `http://localhost:5173`).

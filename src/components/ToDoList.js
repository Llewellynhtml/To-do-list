import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('Low');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const navigate = useNavigate();

  const addTask = () => {
    if (task.trim() === '') return;
    const newTask = { id: Date.now(), text: task, priority };
    setTasks([...tasks, newTask]);
    setTask('');
    setPriority('Low');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const startEditTask = (id) => {
    const taskToEdit = tasks.find(task => task.id === id);
    setTask(taskToEdit.text);
    setPriority(taskToEdit.priority);
    setIsEditing(true);
    setCurrentTaskId(id);
  };

  const updateTask = () => {
    if (task.trim() === '') return;
    setTasks(tasks.map(taskItem => taskItem.id === currentTaskId ? { ...taskItem, text: task, priority } : taskItem));
    setTask('');
    setPriority('Low');
    setIsEditing(false);
    setCurrentTaskId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isEditing ? updateTask() : addTask();
  };

  const priorityClass = (priority) => {
    if (priority === 'High') return 'task-high';
    if (priority === 'Medium') return 'task-medium';
    return 'task-low';
  };

  const handleLogout = () => {
    // Clear user session data here
    navigate('/login');
  };

  return (
    <div className="todolist-container">
      <div className="todolist-header">
        <h3 className="todolist-title">Todo List</h3>
        <button className="logout-button" onClick={handleLogout}>Log Out</button>
      </div>
      <form className="todolist-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a new task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="todolist-input"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="todolist-select"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button type="submit" className="todolist-button">
          {isEditing ? 'Update Task' : 'Add Task'}
        </button>
      </form>
      <ul className="todolist-list">
        {tasks.map(task => (
          <li key={task.id} className={`todolist-item ${priorityClass(task.priority)}`}>
            {task.text}
            <div className="todolist-buttons">
              <button onClick={() => startEditTask(task.id)} className="todolist-edit-button">Edit</button>
              <button onClick={() => deleteTask(task.id)} className="todolist-delete-button">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;

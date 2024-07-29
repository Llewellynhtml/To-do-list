import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ToDoList = () => {
  // Task management states
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskAge, setTaskAge] = useState('');
  const [taskWork, setTaskWork] = useState('');
  const [taskPriority, setTaskPriority] = useState('medium');
  const [taskDueDate, setTaskDueDate] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskName, setEditTaskName] = useState('');
  const [editTaskAge, setEditTaskAge] = useState('');
  const [editTaskWork, setEditTaskWork] = useState('');
  const [editTaskPriority, setEditTaskPriority] = useState('medium');
  const [editTaskDueDate, setEditTaskDueDate] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async () => {
    console.log('Adding task:', { name: taskName, age: taskAge, work: taskWork, priority: taskPriority, due_date: taskDueDate });
    try {
      const response = await axios.post('http://localhost:3001/tasks', {
        name: taskName,
        age: taskAge,
        work: taskWork,
        priority: taskPriority,
        due_date: taskDueDate
      });
      console.log('Task added successfully:', response.data);
      setTaskName('');
      setTaskAge('');
      setTaskWork('');
      setTaskPriority('medium');
      setTaskDueDate('');
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTask = async (id) => {
    try {
      await axios.put(`http://localhost:3001/tasks/${id}`, {
        name: editTaskName,
        age: editTaskAge,
        work: editTaskWork,
        priority: editTaskPriority,
        due_date: editTaskDueDate
      });
      setEditTaskId(null);
      setEditTaskName('');
      setEditTaskAge('');
      setEditTaskWork('');
      setEditTaskPriority('medium');
      setEditTaskDueDate('');
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEditTaskClick = (task) => {
    setEditTaskId(task.id);
    setEditTaskName(task.name);
    setEditTaskAge(task.age);
    setEditTaskWork(task.work);
    setEditTaskPriority(task.priority);
    setEditTaskDueDate(task.due_date);
  };

  return (
    <div className="todo-container">
      <h1 className="title">Task Management</h1>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className="task-item">
            {editTaskId === task.id ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={editTaskName}
                  onChange={(e) => setEditTaskName(e.target.value)}
                  placeholder="Task Name"
                  className="form-input"
                />
                <input
                  type="number"
                  value={editTaskAge}
                  onChange={(e) => setEditTaskAge(e.target.value)}
                  placeholder="Age"
                  className="form-input"
                />
                <input
                  type="text"
                  value={editTaskWork}
                  onChange={(e) => setEditTaskWork(e.target.value)}
                  placeholder="Work"
                  className="form-input"
                />
                <select
                  value={editTaskPriority}
                  onChange={(e) => setEditTaskPriority(e.target.value)}
                  className="form-select"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <input
                  type="date"
                  value={editTaskDueDate}
                  onChange={(e) => setEditTaskDueDate(e.target.value)}
                  className="form-input"
                />
                <div className="button-group">
                  <button onClick={() => updateTask(task.id)} className="update-button">Update</button>
                  <button onClick={() => setEditTaskId(null)} className="cancel-button">Cancel</button>
                </div>
              </div>
            ) : (
              <div className="task-details">
                <span className="task-info">{task.name} - {task.age} - {task.work} - {task.priority} - {task.due_date}</span>
                <div className="button-group">
                  <button onClick={() => handleEditTaskClick(task)} className="edit-button">Edit</button>
                  <button onClick={() => deleteTask(task.id)} className="delete-button">Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="add-task-form">
        <h2 className="subtitle">Add Task</h2>
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="form-input"
        />
        <input
          type="number"
          placeholder="Age"
          value={taskAge}
          onChange={(e) => setTaskAge(e.target.value)}
          className="form-input"
        />
        <input
          type="text"
          placeholder="Work"
          value={taskWork}
          onChange={(e) => setTaskWork(e.target.value)}
          className="form-input"
        />
        <select
          value={taskPriority}
          onChange={(e) => setTaskPriority(e.target.value)}
          className="form-select"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <input
          type="date"
          placeholder="Due Date"
          value={taskDueDate}
          onChange={(e) => setTaskDueDate(e.target.value)}
          className="form-input"
        />
        <button onClick={addTask} className="add-button">Add</button>
      </div>
    </div>
  );
};

export default ToDoList;

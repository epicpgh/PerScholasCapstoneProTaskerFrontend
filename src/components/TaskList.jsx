import { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import TaskFilter from '../components/TaskFilter';
import axios from 'axios';

function TaskListPage() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/api/tasks')
      .then(res => setTasks(res.data))
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch tasks.');
      })
      .finally(() => setLoading(false));
  }, []);
   <ul>
      {tasks.map(task => (
        <li key={task._id}>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          <p>Priority: {task.priority}
             <strong style={{ color: task.priority === "high" ? "red" : "black" }}>
    {task.priority}
  </strong>
            </p> {''}
        </li>
      ))}
    </ul>

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="task-list-page">
      <h2>Your Tasks</h2>
      <TaskFilter onFilter={setSearch} />
      <TaskList tasks={filteredTasks} />
    </div>
  );
}

export default TaskListPage;

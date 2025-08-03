import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import backendClient from '../clients/backendClient';
import TaskForm from '../components/TaskForm';

function TaskDetailPage() {
  const { id } = useParams(); // get task ID from the URL
  const navigate = useNavigate();

  const [task, setTask] = useState({
    title: '',
    description: '',
    completed: false,
    priority: 'Low',
    dueDate: '',
    status: 'To do',
    urgency: 'Medium',
    assignedTo: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    backendClient.get(`/tasks/${id}`)
      .then((res) => {
        setTask(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load task.');
        setLoading(false);
      });
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value
    }));
  };

  // Submit updated task
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await backendClient.put(`/tasks/${id}`, task);
      alert('Task updated!');
      navigate('/tasks'); // go back to task list
    } catch (err) {
      console.error(err);
      setError('Failed to update task.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await backendClient.delete(`/tasks/${id}`);
        alert('Task deleted!');
        navigate('/tasks'); // go back to task list
      } catch (err) {
        console.error(err);
        setError('Failed to delete task.');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Edit Task</h2>
      <TaskForm task={task} onChange={handleChange} onSubmit={handleSubmit} />
    </div>
  );
}


export default TaskDetailPage;
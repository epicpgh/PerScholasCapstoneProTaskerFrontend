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
    const fetchTask = async () => {
      try {
        // Get auth token from localStorage
        const token = JSON.parse(localStorage.getItem('social-app-token'));
        if (!token) {
          navigate('/login');
          return;
        }

        // Set authorization header
        backendClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        console.log('🔄 Fetching task with ID:', id);
        const response = await backendClient.get(`/tasks/${id}`);
        console.log('✅ Task loaded successfully:', response.data);
        
        setTask(response.data);
      } catch (error) {
        console.error('❌ Error loading task:', error);
        
        if (error.response?.status === 401) {
          localStorage.removeItem('social-app-token');
          navigate('/login');
        } else if (error.response?.status === 404) {
          setError('Task not found.');
        } else if (error.response?.status === 403) {
          setError('You do not have permission to view this task.');
        } else {
          setError('Failed to load task. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTask();
    }
  }, [id, navigate]);

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
    setError('');
    
    try {
      const token = JSON.parse(localStorage.getItem('social-app-token'));
      if (!token) {
        navigate('/login');
        return;
      }

      backendClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await backendClient.put(`/tasks/${id}`, task);
      
      alert('Task updated successfully!');
      navigate(-1); // go back to previous page
    } catch (error) {
      console.error('❌ Error updating task:', error);
      
      if (error.response?.status === 401) {
        localStorage.removeItem('social-app-token');
        navigate('/login');
      } else {
        setError('Failed to update task. Please try again.');
      }
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setError('');
      
      try {
        const token = JSON.parse(localStorage.getItem('social-app-token'));
        if (!token) {
          navigate('/login');
          return;
        }

        backendClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await backendClient.delete(`/tasks/${id}`);
        
        alert('Task deleted successfully!');
        navigate(-1); // go back to previous page
      } catch (error) {
        console.error('❌ Error deleting task:', error);
        
        if (error.response?.status === 401) {
          localStorage.removeItem('social-app-token');
          navigate('/login');
        } else {
          setError('Failed to delete task. Please try again.');
        }
      }
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>🔄 Loading Task...</h2>
      </div>
    );
  }
  
  if (error) {
    return (
      <div style={{ padding: '20px' }}>
        <div style={{ 
          color: 'red', 
          backgroundColor: '#ffebee', 
          padding: '15px', 
          borderRadius: '8px', 
          border: '1px solid #ffcdd2',
          marginBottom: '20px'
        }}>
          <h3>❌ Error</h3>
          <p>{error}</p>
        </div>
        <button 
          onClick={() => navigate(-1)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          ← Go Back
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>📝 Edit Task: {task.title}</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => navigate(-1)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            ← Back
          </button>
          <button 
            onClick={handleDelete}
            style={{
              padding: '8px 16px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            🗑️ Delete
          </button>
        </div>
      </div>
      
      {error && (
        <div style={{ 
          color: 'red', 
          backgroundColor: '#ffebee', 
          padding: '10px', 
          borderRadius: '5px', 
          marginBottom: '15px',
          border: '1px solid #ffcdd2'
        }}>
          {error}
        </div>
      )}
      
      <TaskForm task={task} onChange={handleChange} onSubmit={handleSubmit} />
    </div>
  );
}


export default TaskDetailPage;
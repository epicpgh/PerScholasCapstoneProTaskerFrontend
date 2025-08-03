import { useEffect, useState } from "react";
import backendClient from "../clients/backendClient";
import TaskFilter from "../components/TaskFilter";
import { useNavigate, useParams } from "react-router-dom";



import TaskForm from "../components/TaskForm";





function TaskListPage() {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    urgency: "Medium",
    status: "To Do",
    assignedTo: "",
    dueDate: ""
  });


useEffect(() => {
  const fetchData = async () => {
    try {
      // Get auth token from localStorage
      const token = JSON.parse(localStorage.getItem('social-app-token'));
      if (!token) {
        navigate('/login');
        return;
      }

      // Set authorization header
      backendClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Fetch project information
      const projectResponse = await backendClient.get(`/projects/${projectId}`);
      setProject(projectResponse.data);
      console.log('✅ Project loaded:', projectResponse.data);

      // Fetch tasks for this project
      const tasksResponse = await backendClient.get(`/tasks/project/${projectId}`);
      setTasks(tasksResponse.data);
      setFilteredTasks(tasksResponse.data);
      console.log('✅ Tasks loaded:', tasksResponse.data.length, 'tasks');
      
      const usersResponse = await backendClient.get('/users');
      setUsers(usersResponse.data);
      setLoading(false);
    } catch (error) {
      console.error('❌ Error fetching tasks or users:', error);
      console.error('❌ Error response:', error.response);
      console.error('❌ Project ID:', projectId);
      console.error('❌ Backend URL:', import.meta.env.VITE_BACKEND_URL);
      
      if (error.response?.status === 401) {
        localStorage.removeItem('social-app-token');
        navigate('/login');
      } else if (error.response?.status === 404) {
        setError('Project not found or you do not have access to it.');
      } else if (error.response) {
        setError(`Server error: ${error.response.data.message || error.response.status}`);
      } else if (error.request) {
        setError('Cannot connect to server. Is the backend running?');
      } else {
        setError(`Request error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  if (projectId) {
    fetchData();
  }
}, [projectId, navigate]);


  const handleTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };    



  const handleFilterChange = (filters) => {
    let filtered = [...tasks];

    if (filters.status) {
      filtered = filtered.filter(t => t.status === filters.status);
    }
    if (filters.assignedTo) {
      filtered = filtered.filter(t => t.assignedTo === filters.assignedTo);
    }
    if (filters.search) {
      const keyword = filters.search.toLowerCase();
      filtered = filtered.filter(
        t =>
          t.title.toLowerCase().includes(keyword) ||
          (t.description && t.description.toLowerCase().includes(keyword))
      );
    }
    if (filters.due) {
      const now = new Date();
      if (filters.due === "today") {
        filtered = filtered.filter(t =>
          new Date(t.dueDate).toDateString() === now.toDateString()
        );
      } else if (filters.due === "week") {
        const nextWeek = new Date();
        nextWeek.setDate(now.getDate() + 7);
        filtered = filtered.filter(t => {
          const due = new Date(t.dueDate);
          return due >= now && due <= nextWeek;
        });
      } else if (filters.due === "overdue") {
        filtered = filtered.filter(t => new Date(t.dueDate) < now);
      }
    }

    setFilteredTasks(filtered);
  };

 const handleTaskSubmit = async (e) => {
  try {
    e.preventDefault();
   
    // Validate required fields
    if (!newTask.title || !newTask.title.trim()) {
      alert('Please enter a task title');
      return;
    }

    const token = localStorage.getItem('social-app-token');
    if (!token) {
      console.error('❌ No token found, redirecting to login');
      navigate('/login');
      return;
    }

    console.log('🚀 Creating task:', newTask);
    console.log('📡 Posting to:', `/tasks/project/${projectId}`);

    // Set authorization header
    backendClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const taskToSend = { 
      ...newTask,
      project: projectId // Make sure project ID is included
    };
    
    console.log('📤 Sending task data:', taskToSend);
    const res = await backendClient.post(`/tasks/project/${projectId}`, taskToSend);
    console.log('✅ Task created successfully:', res.data);

    const updatedTasks = [...tasks, res.data];
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
    setNewTask({
      title: "",
      description: "",
      urgency: "Medium",
      status: "To Do",
      assignedTo: "",
      dueDate: ""
    });
    
    alert('✅ Task created successfully!');
  } catch (error) {
    console.error('❌ Failed to save task:', error);
    console.error('❌ Error response:', error.response?.data);
    console.error('❌ Error status:', error.response?.status);
    
    // Show specific error message
    let errorMessage = 'Failed to create task';
    if (error.response?.status === 401) {
      errorMessage = 'Authentication failed. Please log in again.';
      navigate('/login');
      return;
    } else if (error.response?.status === 404) {
      errorMessage = 'Project not found or you do not have access to it.';
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }
    
    alert(`❌ ${errorMessage}`);
  }
};

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>🔄 Loading Project and Tasks...</h2>
        <p>Please wait while we fetch your project data.</p>
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
          <h3>❌ Error Loading Tasks</h3>
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
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          ← Go Back
        </button>
        <button 
          onClick={() => window.location.reload()}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          🔄 Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      {/* Project Header */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div>
            <h1>📁 {project?.name || 'Project Tasks'}</h1>
            {project?.description && (
              <p style={{ color: '#666', fontSize: '16px', margin: '5px 0' }}>{project.description}</p>
            )}
            <p style={{ color: '#888', fontSize: '14px' }}>
              Created: {project?.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'Unknown'}
            </p>
          </div>
          <button 
            onClick={() => navigate('/projects')}
            style={{
              padding: '8px 16px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            ← Back to Projects
          </button>
        </div>
      </div>

      {/* Task Creation Form */}
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        border: '2px solid #007bff', 
        borderRadius: '10px', 
        padding: '20px', 
        marginBottom: '30px' 
      }}>
        <h3>➕ Create New Task</h3>
        <TaskForm
          task={newTask}
          onChange={handleTaskChange}
          onSubmit={handleTaskSubmit}
        />
      </div>

      {/* Task Filter */}
      <div style={{ marginBottom: '20px' }}>
        <TaskFilter onFilterChange={handleFilterChange} users={users} />
      </div>

      {/* Tasks Display */}
      <div>
        <h2>📋 Tasks ({filteredTasks.length})</h2>
        
        {filteredTasks.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px', 
            backgroundColor: '#f8f9fa', 
            borderRadius: '10px',
            border: '2px dashed #ddd'
          }}>
            <h3>🚀 No Tasks Yet!</h3>
            <p>This project doesn't have any tasks yet. Create your first task above to get started!</p>
            <p style={{ color: '#666', fontSize: '14px' }}>Tasks help you organize and track your project work.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '15px' }}>
            {filteredTasks.map((task, index) => (
              <div
                key={task._id || `task-${index}`}
                onClick={() => navigate(`/tasks/${task._id}`)}
                style={{
                  cursor: "pointer",
                  border: "2px solid #007bff",
                  padding: "20px",
                  borderRadius: "10px",
                  backgroundColor: '#fff',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#f0f8ff';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#fff';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                  <h3 style={{ margin: '0', color: '#007bff' }}>📝 {task.title}</h3>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    backgroundColor: 
                      task.status === 'Done' ? '#28a745' :
                      task.status === 'In Progress' ? '#ffc107' :
                      task.status === 'Overdue' ? '#dc3545' : '#6c757d',
                    color: 'white'
                  }}>
                    {task.status}
                  </span>
                </div>
                {task.description && (
                  <p style={{ margin: '10px 0', color: '#666' }}>{task.description}</p>
                )}
                <div style={{ display: 'flex', gap: '15px', fontSize: '14px', color: '#888' }}>
                  {task.dueDate && (
                    <span>📅 Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                  )}
                  {task.assignedTo && (
                    <span>👤 Assigned to: {task.assignedTo}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskListPage;
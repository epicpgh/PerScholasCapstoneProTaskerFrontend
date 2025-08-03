import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import backendClient from "../clients/backendClient";

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', description: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('social-app-token'));
        if (!token) {
          navigate('/login');
          return;
        }

        backendClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await backendClient.get('/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Failed to load projects. Please try again.');
        
        if (error.response?.status === 401) {
          localStorage.removeItem('social-app-token');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [navigate]);

  const createProject = async (e) => {
    e.preventDefault();
    setCreating(true);
    setError(null);

    try {
      const token = JSON.parse(localStorage.getItem('social-app-token'));
      if (!token) {
        navigate('/login');
        return;
      }

      backendClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await backendClient.post('/projects', newProject);
      
      // Add the new project to the list
      setProjects(prev => [...prev, response.data]);
      
      // Reset form and hide it
      setNewProject({ name: '', description: '' });
      setShowCreateForm(false);
      
      console.log('✅ Project created successfully:', response.data);
    } catch (error) {
      console.error('❌ Error creating project:', error);
      setError('Failed to create project. Please try again.');
      
      if (error.response?.status === 401) {
        localStorage.removeItem('social-app-token');
        navigate('/login');
      }
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return <div style={{ padding: '20px' }}>Loading projects...</div>;
  }

  if (error) {
    return (
      <div style={{ color: 'red', padding: '20px' }}>
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h1>🗂️ Your Projects</h1>
          <p>Click on a project to view its tasks</p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 24px',
            fontSize: '16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          {showCreateForm ? '❌ Cancel' : '➕ New Project'}
        </button>
      </div>

      {showCreateForm && (
        <div style={{
          backgroundColor: '#f8f9fa',
          border: '2px solid #28a745',
          borderRadius: '10px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h3>Create New Project</h3>
          <form onSubmit={createProject}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Project Name:</label>
              <input
                type="text"
                value={newProject.name}
                onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
                required
                placeholder="Enter project name"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '16px'
                }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Description (Optional):</label>
              <textarea
                value={newProject.description}
                onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter project description"
                rows={3}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '16px',
                  resize: 'vertical'
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="submit"
                disabled={creating || !newProject.name.trim()}
                style={{
                  backgroundColor: creating ? '#ccc' : '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '10px 20px',
                  cursor: creating ? 'not-allowed' : 'pointer'
                }}
              >
                {creating ? 'Creating...' : 'Create Project'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCreateForm(false);
                  setNewProject({ name: '', description: '' });
                }}
                style={{
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '10px 20px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      
      {projects.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h2>🚀 No Projects Yet</h2>
          <p>Create your first project to start managing tasks!</p>
          <button 
            onClick={() => setShowCreateForm(true)}
            style={{
              padding: '12px 24px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              marginTop: '10px'
            }}
          >
            ➕ Create Your First Project
          </button>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gap: '15px', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' 
        }}>
          {projects.map(project => (
            <div 
              key={project._id}
              onClick={() => navigate(`/projects/${project._id}/tasks`)}
              style={{
                border: '2px solid #007bff',
                borderRadius: '10px',
                padding: '20px',
                cursor: 'pointer',
                backgroundColor: '#f8f9fa',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#e7f3ff';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#f8f9fa';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <h3 style={{ margin: '0 0 10px 0', color: '#007bff' }}>
                📁 {project.name}
              </h3>
              <p style={{ margin: '0 0 15px 0', color: '#666' }}>
                {project.description || 'No description'}
              </p>
              <div style={{ fontSize: '0.9em', color: '#888' }}>
                Created: {new Date(project.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectsPage;

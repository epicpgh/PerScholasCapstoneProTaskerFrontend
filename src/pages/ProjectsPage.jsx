import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import backendClient from "../clients/backendClient";

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token');
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
          localStorage.removeItem('token');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [navigate]);

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
      <h1>🗂️ Your Projects</h1>
      <p>Click on a project to view its tasks</p>
      
      {projects.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h2>No Projects Yet</h2>
          <p>Create your first project to start managing tasks!</p>
          <button 
            onClick={() => navigate('/')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Go to Home
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

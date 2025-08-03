import { useState } from "react";

import  backendClient  from '../clients/backendClient.js';

import { useNavigate } from "react-router-dom";

function RegisterPage(){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      console.log('🔄 Attempting registration with:', { 
        username: formData.username, 
        email: formData.email 
      });
      console.log('🌐 Backend URL:', import.meta.env.VITE_BACKEND_URL);
      
      const res = await backendClient.post('/users/register', formData);
      console.log('✅ Registration successful:', res.data);

      localStorage.setItem('social-app-token', JSON.stringify(res.data.token));
      navigate('/projects');
        
    } catch (error) {
      console.error('❌ Registration error:', error);
      console.error('❌ Error response:', error.response);
      console.error('❌ Error request:', error.request);
      
      if (error.response) {
        // Server responded with error status
        console.error('❌ Response data:', error.response.data);
        console.error('❌ Response status:', error.response.status);
        setError(error.response.data.message || `Server error: ${error.response.status}`);
      } else if (error.request) {
        // Request was made but no response received
        console.error('❌ No response received');
        setError('Cannot connect to server. Is the backend running?');
      } else {
        // Something else happened
        console.error('❌ Request setup error:', error.message);
        setError(`Request error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };
    return (
    <main>
      <h1>RegisterPage</h1>

      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        
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
        
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          placeholder="User Name"
          value={formData.username}
          onChange={handleChange}
          style={{ marginBottom: "1rem" }}
        />
<br></br>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
            style={{ marginBottom: "1rem" }}
        />
<br></br>
        <label htmlFor="password" >Password:  </label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
            style={{ marginBottom: "1rem" }}
        />
        <br></br>

                <input 
                  type="submit" 
                  value={loading ? "Registering..." : "Register"}
                  disabled={loading}
                  style={{
                    backgroundColor: loading ? '#ccc' : '#007bff',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '5px',
                    color: 'white'
                  }}
                />
         </form>
        </main>

    )
       
    
}

export default RegisterPage;
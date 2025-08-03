import { useState } from "react";

import backendClient from "../clients/backendClient";

import { useNavigate } from "react-router-dom";


function LoginPage(){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
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
      console.log('🔄 Attempting login with:', { email: formData.email });
      console.log('🌐 Backend URL:', import.meta.env.VITE_BACKEND_URL);
      
      const res = await backendClient.post('/users/login', formData);
      console.log('✅ Login successful:', res.data);

      localStorage.setItem('social-app-token', JSON.stringify(res.data.token));
      navigate('/projects');
        
    } catch (error) {
      console.error('❌ Login error:', error);
      
      if (error.response) {
        // Server responded with error status
        setError(error.response.data.message || 'Login failed');
      } else if (error.request) {
        // Request was made but no response received
        setError('Cannot connect to server. Is the backend running?');
      } else {
        // Something else happened
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };
    return (
    <main>
      <h1>Log In Page</h1>
 <form onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        
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

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={{ marginBottom: "1rem" }}
        />
<br/>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={{ marginBottom: "1rem" }}
        />
<br/>

                <input 
                  type="submit" 
                  value={loading ? "Signing In..." : "Welcome Back!"}
                  disabled={loading}
                  style={{
                    backgroundColor: loading ? '#ccc' : '#007bff',
                    cursor: loading ? 'not-allowed' : 'pointer'
                  }}
                />
         </form>
        </main>

    )
       
    
}

export default LoginPage;
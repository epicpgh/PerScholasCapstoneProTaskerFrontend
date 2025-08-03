import { useState } from "react";

import  backendClient  from '../clients/backendClient.js';

import { useNavigate } from "react-router-dom";

function RegisterPage(){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    })
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const res = await backendClient.post('/users/register', formData);
        console.log(res.data);

        localStorage.setItem('social-app-token', JSON.stringify(res.data.token));
            navigate('/tasks')
        
    } catch (error) {
        console.log(error);     
    }
  };
    return (
    <main>
      <h1>RegisterPage</h1>

      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
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

                <input type="submit" value="Register"/>
         </form>
        </main>

    )
       
    
}

export default RegisterPage;
import { useState } from "react";

import backendClient from "../clients/backendClient";

import { useNavigate } from "react-router-dom";


function LoginPage(){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        
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
        const res = await backendClient.post('/users/login', formData);
        console.log(res.data);

        localStorage.setItem('social-app-token', JSON.stringify(res.data.token));
            navigate('/tasks')
        
    } catch (error) {
        console.log(error);     
    }
  };
    return (
    <main>
      <h1>Log In Page</h1>
 <form onSubmit={handleSubmit}>
        <h2>Sign In</h2>
       
        

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

                <input type="submit" value="Welcome Back!"/>
         </form>
        </main>

    )
       
    
}

export default LoginPage;
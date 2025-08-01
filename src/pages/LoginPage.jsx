import { useState } from "react";

import axios from "axios";

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
        const res = await axios.post('/users/login', formData);
        console.log(res.data);

        localStorage.setItem('social-app-token', JSON.stringify(res.data.token));
            navigate('/feed')
        
    } catch (error) {
        console.log(error);     
    }
  };
    return (
    <main>
      <h1>Log In Page</h1>
 <form onSubmit={handleSubmit}>
        <h2>Sign In</h2>
       
        

        <label htmlFor="username" />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          style={{ marginBottom: "1rem" }}
        />
<br/>
        <label htmlFor="password" />
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
import { NavLink } from "react-router-dom";
import {useEffect, useState} from 'react';




const NavBar = () => {
   const [isMobile, setIsMobile] = useState(window.innerWidth < 600);




   useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
   }, []);



   const navStyles ={
    backgroundColor: '#dd2b2bff',
    padding: '1rem',
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    gap: isMobile ? '0.5rem' : '4rem',
    borderRadius: '8px',
    justifyContent: isMobile ? 'center' : 'space-around',
    alignItems: 'center',
    fontFamily: '"Comic Sans MS", cursive',
   }

   const linkStyles = {
    color: "white",
    textDecoration: "none",
    fontSize: "1rem",
  };

 return (
    <nav style={navStyles}>
      <NavLink to="/" style={linkStyles}>Home</NavLink>
      <NavLink to="/register" style={linkStyles}>Register</NavLink>
      <NavLink to="/login" style={linkStyles}>Log In</NavLink>
      <NavLink to="/projects" style={linkStyles}>Projects</NavLink>
    </nav>
  );
};
export default NavBar;  
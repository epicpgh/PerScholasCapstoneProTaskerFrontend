import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import GarfieldBanner from './components/GarfieldBanner.jsx';
import NavBar from './components/NavBar.jsx';

import TaskDetailPage from './pages/TaskDetailPage.jsx';
import HomePage from './pages/HomePage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import CurrentTaskPage from './pages/CurrentTaskPage.jsx';
import TaskListPage from './pages/TaskListPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';

import './App.css';

function App() {
  return (
    <>
      <GarfieldBanner />

      <div className="navbar">
        <h1>Garfield Pro-Tasker</h1>
        <h2>Task Management but with Garfield</h2>
        <NavBar />
      </div>

    
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/tasks" element={<ProjectsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:projectId/tasks" element={<TaskListPage />} />
          <Route path="/tasks/:id" element={<TaskDetailPage />} />
          <Route path='/tasks/:id/current' element={<CurrentTaskPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
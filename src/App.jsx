import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import GarfieldBanner from './components/GarfieldBanner';
import NavBar from './components/NavBar';

import TaskDetailPage from './pages/TaskDetailPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import CurrentTaskPage from './pages/CurrentTaskPage';
import TaskListPage from './pages/TaskLIstPage';

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
          <Route path="/tasks" element={<TaskListPage />} />
          <Route path="/tasks/:id" element={<TaskDetailPage />} />
          <Route path='/tasks/:id' element={<CurrentTaskPage />} />'
        </Routes>
      </main>
    </>
  );
}

export default App;
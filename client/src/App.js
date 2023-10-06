import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/pages/login.js';
import Dashboard from './components/pages/dashboard.js';
import Admin from './components/pages/admin.js';

function App() {

  const handleLogout = () =>{
    localStorage.removeItem("user");
  }

  const isAuthenticated = ()=>{
    const user=JSON.parse(localStorage.getItem('user'));
    if(user) return true;
    return false;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Login/>} />
          <Route path="/dashboard" element={isAuthenticated() ? <Dashboard onLogout={handleLogout}/> : <Navigate to="/login" />} />
          <Route path="/admin" element={<Admin/>}/>
          <Route index element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/pages/login.js';
import Dashboard from './components/pages/dashboard.js';
import Admin from './components/pages/admin.js';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = () => {
    // Assuming successful authentication logic here
    // Set authenticated to true when the user is authenticated
    setAuthenticated(true);
  };
  const handleLogout = () =>{
    setAuthenticated(false);
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={authenticated ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
          <Route path="/dashboard" element={authenticated ? <Dashboard onLogout={handleLogout}/> : <Navigate to="/login" />} />
          <Route path="/admin" element={<Admin onLogout={handleLogout}/>}/>
          <Route index element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

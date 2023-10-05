import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/login.css';

function Login({onLogin}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLoginClick();
  };

  const handleAdminClick = () => {
    navigate('/admin');
  }  

  const handleLoginClick = () => {
    // Implement your authentication logic here
    // If authentication is successful, call the onLogin callback
    // Otherwise, display an error message
    if (true) {
      onLogin();
      navigate('/dashboard'); 
    } else {
      alert('Authentication failed. Please check your credentials.');
    }
  };

  return (
    <div className='login-page-container'>
        <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                required
            />
            </div>
            <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                required
            />
            </div>
            <table width='100%'>
              <tr>
                <td width='50%'><button type="submit">Login</button></td>
                <td width='50%'><button onClick={handleAdminClick}>I am Admin</button></td>
              </tr>
            </table>
        </form>
        </div>        
    </div>

  );
}

export default Login;

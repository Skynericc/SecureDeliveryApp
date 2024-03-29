import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../css/login.css';

function Login() {
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

    axios.post('http://localhost:3000/login', {
      "email": email,
      "mdp": password,
    })
    .then(response => {
      if (response.status===200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate('/dashboard');         
        window.location.reload();
      }
    })
    .catch(error => {
      showLoginErrorSnackbar();
    });
  };

  const showLoginErrorSnackbar = () => {
    toast.error('Please check your credentials', {
      position: 'bottom-right',
      autoClose: 3000,
    }); 
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
        <ToastContainer />  
    </div>

  );
}

export default Login;

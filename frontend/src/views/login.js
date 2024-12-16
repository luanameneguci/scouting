import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate para navegação
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import './login.css';


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate(); // Hook para navegação

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate('/home'); 
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  const handleForgotPassword = () => {

    navigate('/forgot-password'); 
  };


  return (
    <div className="login-container">
      <h1>LOGIN</h1>
      <div className="login-signup">
        New User? <button className="text-button">Sign Up</button>
      </div>
      <form onSubmit={handleSubmit}>
        {/* Email */}
        <div className="login-form-group">
          <label className="login-label">Email</label>
          <div className="login-input-group">
            <EmailIcon />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Password */}
        <div className="login-form-group">
          <label className="login-label">Password</label>
          <div className="login-input-group">
            <PersonIcon />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Forgot Password */}
        <div className="forgot-password">
          <button
            type="button"
            className="text-button"
            onClick={handleForgotPassword} // Redireciona para a página de recuperação de senha
          >
            Forgot Password?
          </button>
        </div>

        {/* Botão de Login */}
        <div>
          <button type="submit" className="login-submit-button">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;

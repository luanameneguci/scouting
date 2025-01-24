import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate para navegação
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import './login.css';


const Login = () => {
  const url = process.env.REACT_APP_API_URL;
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate(); // Hook para navegação

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      await axios.post(`${url}/auth/login`, {email: formData.email , password: formData.password}).then((response) => {
        if (response.status == 200) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userData', response.data.user);
          console.log('Login realizado com sucesso.');
          navigate('/dashboard');
        }
      });
    } catch (error) {
      if (error.response) { // Se for erro de resposta (status 40X)
        console.error(error.response.data.message);
      } else if (error.request) { // Se não houver resposta (provavelmente erro de conexão)
        console.error('No response received:', error.request);
      } else {
        console.error('Error', error.message);
      }
    }
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
              placeholder="Insira o seu email..."
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Password */}
        <div className="login-form-group">
          <label className="login-label">Palavra-passe</label>
          <div className="login-input-group">
            <PersonIcon />
            <input
              type="password"
              name="password"
              placeholder="Insira a sua palavra-passe..."
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

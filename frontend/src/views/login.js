import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate para navegação
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import Cookies from 'js-cookie';
import './login.css';
import LoadingAnim from '../components/loadingAnim';


const Login = () => {
  const url = process.env.REACT_APP_API_URL;
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate(); // Hook para navegação

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');

    if (!formData.email) {
      setEmailError('O email é obrigatório.');
    }
    if (!formData.password) {
      setPasswordError('A palavra-passe é obrigatória.');
    }
    if (formData.password && formData.email) {
      setLoading(true);
      try {
        await axios.post(`${url}/auth/login`, { email: formData.email, password: formData.password }).then((response) => {
          if (response.status == 200) {
            Cookies.set('token', response.data.token, { expires: 1 });
            localStorage.setItem('userData', JSON.stringify(response.data.user));
            console.log('Login realizado com sucesso.');
            navigate('/home');
          }
        });
      } catch (error) {
        if (error.response) { // Se for erro de resposta (status 40X)
          switch (error.response.status) {
            case 400:
              setPasswordError(error.response.data.message);
              break;
            case 404:
              setEmailError(error.response.data.message);

              break;
            default:
              setPasswordError('Erro desconhecido.');
              setEmailError('Erro desconhecido.');
              break;
          }
        } else {
          console.error('Error', error.message);
        }
        setLoading(false);
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
    <div className="login-container ">
      <div >
        <h1>Autenticar</h1>
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="login-form-group">
            <label className="login-label font-bold">Email</label>
            <div className={`login-input-group ${emailError && 'error'}`}>
              <EmailIcon />
              <input
                type="email"
                name="email"
                placeholder="Insira o seu email..."
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            {emailError && <p className='error-message text-secondary'>{emailError}</p>}

          </div>

          {/* Password */}
          <div className="login-form-group">
            <label className="login-label font-bold">Palavra-passe</label>
            <div className={`login-input-group ${passwordError && 'error'}`}>
              <PersonIcon />
              <input
                type="password"
                name="password"
                placeholder="Insira a sua palavra-passe..."
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            {passwordError && <p className='error-message text-secondary'>{passwordError}</p>}
          </div>

          {/* Forgot Password */}
          <button
            type="button"
            className="text-button forgot-password"
            onClick={handleForgotPassword} // Redireciona para a página de recuperação de senha
          >
            Esqueci-me da palavra-passe
          </button>

          {/* Botão de Login */}
          <div>
            <button type="submit" className="login-submit-button rounded-pill font-bold" disabled={loading}>
              {!loading ? 'Continuar' : <LoadingAnim />}

            </button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default Login;
